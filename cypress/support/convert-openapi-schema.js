const fs = require('fs');

function checkRef(obj) {
  // Recursive object 
  for (const [k, v] of Object.entries(obj)) {
    if (k === '$ref') {
      return v;
    } else {
      if (typeof v === 'object' && v !== null) {
        const result = checkRef(v);
        if (result !== null) {
          return result;
        }
      }
    }
  }
  return null;
}

fs.readFile('./cypress/fixtures/openapi.json', 'utf8', (err, dataStr) => {
  if (err) {
    console.error(err);
    return;
  }

  const data = JSON.parse(dataStr);

  // Prepare Component replace other component
  for (const component in data['components']['schemas']) {
    const componentProp = checkRef(data['components']['schemas'][component]);
    if (componentProp !== null) {
      for (const [propK, propV] of Object.entries(data['components']['schemas'][component]['properties'])) {
        if (checkRef(propV) !== null) {
          const componentRefForComponent = checkRef(propV).split('/').pop();
          data['components']['schemas'][component]['properties'][propK] = data['components']['schemas'][componentRefForComponent];
        }
      }
    }
  }

//   console.log(data);

  for (const path in data['paths']) {
    for (const method in data['paths'][path]) {

      // Update $ref on responses
      for (const stt in data['paths'][path][method]['responses']) {
        console.log('path :>> ', path);
        console.log('stt :>> ', stt);
        if (checkRef(data['paths'][path][method]['responses'][stt]) !== null) {
          const ref = data['paths'][path][method]['responses'][stt]['content']['application/json']['schema']['$ref'];
          const componentRef = ref.split('/').pop();
          data['paths'][path][method]['responses'][stt]['content']['application/json']['schema'] = data['components']['schemas'][componentRef];
        }
      }

      // Update $ref on request body
      const requestBody = data['paths'][path][method]['requestBody'];
      if (requestBody !== null && requestBody !== undefined) {
        if (checkRef(requestBody['content']['application/json']['schema']) !== null) {
          const refReq = requestBody['content']['application/json']['schema']['$ref'];
          const componentRefReq = refReq.split('/').pop();
          data['paths'][path][method]['requestBody']['content']['application/json']['schema'] = data['components']['schemas'][componentRefReq];
        }
      }

      // Update $ref on Parameter (get)
      const parameters = data['paths'][path][method]['parameters'];
      if (parameters !== null && parameters !== undefined) {
        for (let i = 0; i < parameters.length; i++) {
          if (checkRef(parameters[i]['schema']) !== null) {
            const refParam = parameters[i]['schema']['$ref'];
            const componentRefParam = refParam.split('/').pop();
            data['paths'][path][method]['parameters'][i]['schema'] = data['components']['schemas'][componentRefParam];
          }
        }
      }
    }
  }

  fs.writeFile('./cypress/fixtures/openapi-converted.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File has been written.');
    }
  });
});
