import React from 'react'

import ViewDef from '../tmp/ViewDef'
import ViewFactory from '../tmp/ViewFactory'
import FieldDef from '../tmp/FieldDef'

import '../tmp/default.css'

// https://bitbucket.org/bettercloud/ae-git-bridge-micro/src/31303ff8814fbdee3e9e0b1f82e2c08d98cb02a4/src/main/resources/static/admin/index.html?at=continuous&fileviewer=file-view-default

const accessControlViewDef = ViewDef.List({
  fields: [
    FieldDef.String({ label: 'Permission', path: '$.key' }),
    FieldDef.Tags({ label: 'Access', path: '$.access' }),
  ]
})

const parameterFormDef = ViewDef.List({
  fields: [
    FieldDef.String({ label: 'Parameter ID', path: '$.id' }),
    FieldDef.String({ label: 'name', path: '$.name' }),
    FieldDef.Bool({ label: 'Required', path: '$.required' }),
    FieldDef.String({ label: 'Context Class', path: '$.contextClass' }),
    FieldDef.String({ label: 'Type', path: '$.type' }),
  ]
})

const actionViewDef = ViewDef.of({
  collection: 'actions',
  fields: [
    FieldDef.String({ label: 'Name', path: '$.name' }), // TODO: Title/Classes
    FieldDef.String({ label: 'Id', path: '$.id' }), // TODO: SubTitle/Classes
    FieldDef.Bool({ label: 'Enabled', path: '$.ae.enabled' }),
    FieldDef.Bool({ label: 'Visible', path: '$.ae.visible' }),
    FieldDef.Bool({ label: 'Deprecated', path: '$.ae.deprecated' }),
    FieldDef.Json({ label: 'Meta', path: '$.ae.meta' }),
    FieldDef.EmbeddedList({ label: 'Access Control Checks', path: '$.ae.accessControlChecks', viewDef: accessControlViewDef }),
    FieldDef.String({ label: 'Provider', path: '$.ae.providerId' }), // TODO: EnrichableString
    FieldDef.EmbeddedList({ label: 'Parameters', path: '$.ae.parameters', viewDef: parameterFormDef }),

    // TODO: custom steps form field? could be done with drag and drop? http://jsfiddle.net/vacidesign/uskx816g/
  ]
})

const model = {
  "ae": {
    "accessControlChecks": [
      {
        "key": "SLACK_VIEW_USERS",
        "access": [
          "CREATE",
          "EDIT",
          "DELETE",
          "VIEW"
        ]
      },
      {
        "key": "SLACK_VIEW_CHANNELS",
        "access": ["CREATE"]
      },
      {
        "key": "SLACK_MANAGE_USERS",
        "access": ["CREATE"]
      },
      {
        "key": "SLACK_MANAGE_CHANNELS",
        "access": ["CREATE"]
      }
    ],
    "parameters": [
      {
        "id": "5d8e76cd-a054-4c6d-ae10-a5f950131889",
        "name": "userId",
        "required": true,
        "contextClass": "SlackUser",
        "type": "ID"
      }
    ],
    "enabled": true,
    "visible": true,
    "deprecated": false,
    "meta": "{\n    \"ff\": [ \"enable_sf_ga\" ]\n}",
    "providerId": "uuid-bettercloud-1234"
  },
  "id": "8130fb7f-8e76-419f-ada2-ab108c96fd06",
  "name": "My New Action"
}

const Demo = ({ curr }) => {
  return (
    <div className="StringFieldDemo">
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
