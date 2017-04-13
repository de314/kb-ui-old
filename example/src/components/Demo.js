import React from 'react'
import { compose, withState } from 'recompose'
import uuid from 'uuid'

import FormDef from '../tmp/forms/FormDef'
import FormFactory from '../tmp/forms/FormFactory'
import FieldDef from '../tmp/forms/FieldDef'

// https://bitbucket.org/bettercloud/ae-git-bridge-micro/src/31303ff8814fbdee3e9e0b1f82e2c08d98cb02a4/src/main/resources/static/admin/index.html?at=continuous&fileviewer=file-view-default


/*
How shit works:

Field State
model@fieldDef.path => fieldDef.defaultVale => field.defaultValue

Embedded Form State
model@fieldDef.path => fieldDef.defaultValue => fieldDef.formDef.fields.defaultValue
*/

const parameterTypes = [
  { value: "ID", text: "ID" },
  { value: "STRING", text: "String (textbox)" },
  { value: "TEXT", text: "Text (textarea)" },
  { value: "INTEGER", text: "Int" },
  { value: "DOUBLE", text: "Double" },
  { value: "BOOLEAN", text: "Boolean" },
  { value: "MAP", text: "Map" },
  { value: "ARRAY", text: "Array" },
]

const providers = [
  { value: uuid(), text: 'Google' },
  { value: 'uuid-bettercloud-1234', text: 'BetterCloud' },
  { value: uuid(), text: 'Slack' },
  { value: uuid(), text: 'Zendesk' },
  { value: uuid(), text: 'Dropbox' }
]

const providersPromise = new Promise((resolve, reject) => setTimeout(() => resolve(providers), 1500));

const permissions = [
  "SLACK_VIEW_USERS", "SLACK_VIEW_CHANNELS", "SLACK_MANAGE_USERS", "SLACK_MANAGE_CHANNELS", "GOOGLE_ADMIN"
]

const permissionsPromise = new Promise((resolve, reject) => setTimeout(() => resolve(permissions), 2000));

const accessControlFormDef = FormDef.List({
  fields: [
    FieldDef.SimpleSelect({ label: 'Permission', path: '$.key', choices: permissionsPromise }),
  ]
})

const parameterFormDef = FormDef.List({
  fields: [
    FieldDef.String({ label: 'id', path: '$.id', defaultValue: uuid, readOnly: true }),
    FieldDef.String({ label: 'name', path: '$.name' }),
    FieldDef.Bool({ label: 'Required', path: '$.required', defaultValue: true }),
    FieldDef.String({ label: 'Context Class', path: '$.contextClass' }), // TODO: typeahead
    FieldDef.SimpleSelect({ label: 'Type', path: '$.type', defaultValue: 'ID', choices: parameterTypes }),
  ]
})

const actionFormDef = FormDef.of({
  collection: 'actions',
  fields: [
    FieldDef.String({
      label: 'Id',
      path: '$.id',
      readOnly: true,
      defaultValue: uuid
    }),
    FieldDef.String({ label: 'Name', path: '$.name' }),
    FieldDef.Bool({ label: 'Enabled', path: '$.ae.enabled', defaultValue: true }),
    FieldDef.Bool({ label: 'Visible', path: '$.ae.visible', defaultValue: true }),
    FieldDef.Bool({ label: 'Deprecated', path: '$.ae.deprecated' }),
    FieldDef.Json({ label: 'Meta', path: '$.ae.meta', defaultValue: '{}' }),
    FieldDef.EmbeddedList({ label: 'Access Control Checks', path: '$.ae.accessControlChecks', formDef: accessControlFormDef }),
    // FieldDef.EmbeddedForm({ label: 'Access Control Checks', path: '$.ae.accessControlCheck', formDef: accessControlFormDef }),
    FieldDef.SimpleSelect({ label: 'Provider', path: '$.ae.providerId', choices: providersPromise }),
    FieldDef.EmbeddedList({ label: 'Parameters', path: '$.ae.parameters', formDef: parameterFormDef }),
    // TODO: custom steps form field? could be done with drag and drop? http://jsfiddle.net/vacidesign/uskx816g/
  ]
})

const model = {
  // id: "aaa-1111-bbbb-22",
  ae: {
    // accessControlCheck: {},
    "accessControlChecks": [
      {
        "key": "SLACK_VIEW_USERS"
      },
      {
        "key": "SLACK_VIEW_CHANNELS"
      },
      {
        "key": "SLACK_MANAGE_USERS"
      },
      {
        "key": "SLACK_MANAGE_CHANNELS"
      },
      {
        "key": "GOOGLE_ADMIN"
      }
    ],
    // providerId: providers[1].value
  }
}

const Demo = ({ curr, setCurr, saved, setSaved }) => {
  return (
    <div className="StringFieldDemo">
      <h1>Form Input</h1>
      <div>
        <pre>{ JSON.stringify(model, null, 2) }</pre>
      </div>
      <h1>Form</h1>
      { FormFactory.render(actionFormDef, model, setCurr, setSaved) }
      <h1>Current Form Model</h1>
      <div>
        <pre>{ JSON.stringify(curr, null, 2) }</pre>
      </div>
      <h1>Submitted Model</h1>
      <div>
        <pre>{ JSON.stringify(saved, null, 2) }</pre>
      </div>
    </div>
  );
}

export default compose(
  withState('curr', 'setCurr', model),
  withState('saved', 'setSaved', undefined)
)(Demo)
