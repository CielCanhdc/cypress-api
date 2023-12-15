
const fs = require('fs');
const $RefParser = require('json-schema-ref-parser');
$RefParser.dereference('./cypress/fixtures/openapi.json', (err, data) => {
  if (err) {
    console.error(err);
  }
  else {
    let updateData = {
      path: null,
      method: null,
      payload: {},
      resp: {},
      schema: {}
  }
  for (const it in data.paths) {
      // console.log('it :>> ', it);
      
      for (const method in data.paths[it]) {
          // console.log('method :>> ', data.paths[it][method].responses);

          updateData.path = it
          updateData.method = method.toUpperCase()
          if (data.paths[it][method].responses[200].hasOwnProperty('content')) {
              updateData.schema[200] = data.paths[it][method].responses[200].content['application/json'].schema        
          }

          // Init fixture name 
          let fixtureName = it.split('/').slice(2).join('-') + `__${method.toUpperCase()}.json`
          
          console.log('fixtureName :>> ', fixtureName);

          fs.writeFile(`./cypress/fixtures/api/${fixtureName}`, JSON.stringify(updateData, null, 2), (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('File has been written.  =>>> ', fixtureName);
              }
            });


      }
      
  }



  }
})
