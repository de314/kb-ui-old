import React from 'react'
import _ from 'lodash'
import ProviderDef from '../lib-src/ProviderDef'

import '../../../dist/default.css'

const items = [
  { id: 0, roles: ['SUPER_ADMIN'], name: 'User #1', email: 'user1@google.com', age: 5 },
  { id: 1, roles: ['ADMIN'], name: 'User #2', email: 'user2@twitter.com', age: 16 },
  { id: 2, roles: ['TESTER'], name: 'Ted', email: 'tester@bettercloud.com', age: 21 },
  { id: 3, roles: [], name: 'User #4', email: 'user4@aol.com', age: 40 },
  { id: 4, roles: [], name: 'User #5', email: 'user5@hotmail.com', age: 80 }
];

const UserProvider = ProviderDef.InMem({ items })

const j = (o) => JSON.stringify(o, null, 2)

console.log("UserProvider.findOne(-1)", j(UserProvider.findOne(-1)));
console.log("UserProvider.findOne(2)", j(UserProvider.findOne(2)));
console.log("UserProvider.findAll()", j(UserProvider.findAll()));
console.log("UserProvider.findAll(3, 0)", j(UserProvider.findAll(3, 0)));
console.log("UserProvider.findAll(3, 1)", j(UserProvider.findAll(3, 1)));
console.log("UserProvider.findAll(100, 0, { id: (id) => id < 2 })", j(UserProvider.findAll(100, 0, { id: (id) => id < 2 })));

const Demo = ({ formState, onSubmit }) => {
  console.log(formState);
  return (
    <div className="StringFieldDemo">
      open the console
    </div>
  );
}

export default Demo
