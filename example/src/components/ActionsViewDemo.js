import React from 'react'
import uuid from 'uuid'

import ViewDef from '../tmp/ViewDef'
import ViewFactory from '../tmp/ViewFactory'
import FieldDef from '../tmp/FieldDef'

// https://bitbucket.org/bettercloud/ae-git-bridge-micro/src/31303ff8814fbdee3e9e0b1f82e2c08d98cb02a4/src/main/resources/static/admin/index.html?at=continuous&fileviewer=file-view-default

const actionViewDef = ViewDef.Table({
  collection: 'actions',
  lable: 'Actions',
  fields: [
    FieldDef.String({ header: 'Id', path: '$.id' }),
    FieldDef.String({ header: 'Name', path: '$.name' }),
    FieldDef.Bool({ header: 'Enabled', path: '$.enabled' }),
    FieldDef.Bool({ header: 'Visible', path: '$.visible' }),
    FieldDef.String({ header: 'Provider', path: '$.providerId' }),
  ]
})

const model = [
  {
    "id": uuid(),
    "name": "My New Action",
    "enabled": true,
    "visible": true,
    "providerId": "uuid-bettercloud-1234"
  },
  {
    "id": uuid(),
    "name": "Another Test Action",
    "enabled": true,
    "visible": true,
    "providerId": "uuid-bettercloud-1234"
  },
  {
    "id": uuid(),
    "name": "Noop",
    "enabled": true,
    "visible": false,
    "providerId": "uuid-bettercloud-1234"
  },
  {
    "id": uuid(),
    "name": "[DELETED] Old Action",
    "enabled": false,
    "visible": false,
    "providerId": "uuid-bettercloud-1234"
  }
]

const Demo = ({ curr }) => {
  return (
    <div className="StringFieldDemo" style={{ marginLeft: "10vw", width: "80vw"}}>
      <h1>View Input</h1>
      <div>
        <pre>{ JSON.stringify(model, null, 2) }</pre>
      </div>
      <h1>View</h1>
      { ViewFactory.render(actionViewDef, model) }
    </div>
  );
}

export default Demo
