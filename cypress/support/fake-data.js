import { faker } from '@faker-js/faker';


export function userExtraInfo() {
    return {
      city: faker.location.city(),
      mail: faker.internet.email(),
      name: faker.person.fullName(),
      phone_number: faker.phone.number()
    };
  }

