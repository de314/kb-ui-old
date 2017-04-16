import React from 'react'
import _ from 'lodash'
import ProviderDef from '../lib-src/ProviderDef'

import PagedContainer from '../lib-src/views/PagedContainer'
import FieldDef from '../lib-src/FieldDef'
import ViewDef from '../lib-src/ViewDef'

import '../lib-src/default.css'

const items = [
  { id: 0, roles: ['SUPER_ADMIN'], name: 'User #1', email: 'user1@google.com', age: 5 },
  { id: 1, roles: ['ADMIN'], name: 'User #2', email: 'user2@twitter.com', age: 16 },
  { id: 2, roles: ['TESTER'], name: 'Ted', email: 'tester@bettercloud.com', age: 21 },
  { id: 3, roles: [], name: 'User #4', email: 'user4@aol.com', age: 40 },
  { id: 4, roles: [], name: 'User #5', email: 'user5@hotmail.com', age: 80 }
];

const UserProvider = ProviderDef.InMem({ items })

const pagedTableDef = ViewDef.Table({
  fields: [
    FieldDef.String({ header: 'ID', path: '$.id' }),
    FieldDef.String({ header: 'Name', path: '$.name' }),
    FieldDef.String({ header: 'Email', path: '$.email' }),
    FieldDef.String({ header: 'Age', path: '$.age' })
  ]
})

const Demo = () => {
  return (
    <div className="StringFieldDemo">
      <PagedContainer provider={UserProvider} subViewDef={pagedTableDef} pagination={{ limit: 2 }} />
    </div>
  );
}

export default Demo
