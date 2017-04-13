import React from 'react'
import { compose, withState } from 'recompose'
import uuid from 'uuid'

import FormDef from '../tmp/FormDef'
import FormFactory from '../tmp/FormFactory'
import FieldDef from '../tmp/FieldDef'

// https://bitbucket.org/bettercloud/ae-git-bridge-micro/src/31303ff8814fbdee3e9e0b1f82e2c08d98cb02a4/src/main/resources/static/admin/index.html?at=continuous&fileviewer=file-view-default


/*
How shit works:

Field State
model@fieldDef.path => fieldDef.defaultVale => field.defaultValue

Embedded Form State
model@fieldDef.path => fieldDef.defaultValue => fieldDef.formDef.fields.defaultValue
*/

const parameterTypes = [
  { value: "ID", label: "ID" },
  { value: "STRING", label: "String (textbox)" },
  { value: "TEXT", label: "Text (textarea)" },
  { value: "INTEGER", label: "Int" },
  { value: "DOUBLE", label: "Double" },
  { value: "BOOLEAN", label: "Boolean" },
  { value: "MAP", label: "Map" },
  { value: "ARRAY", label: "Array" },
]

const providers = [
  { value: uuid(), label: 'Google' },
  { value: 'uuid-bettercloud-1234', label: 'BetterCloud' },
  { value: uuid(), label: 'Slack' },
  { value: uuid(), label: 'Zendesk' },
  { value: uuid(), label: 'Dropbox' }
]

const getProviders = function(input, callback) {
  setTimeout(() => { callback(null, { options: providers, complete: true }) }, 1500)
};

// const providersPromise = new Promise((resolve, reject) => setTimeout(() => resolve(providers), 1500));

const permissions = [
  "SLACK_VIEW_USERS", "SLACK_VIEW_CHANNELS", "SLACK_MANAGE_USERS", "SLACK_MANAGE_CHANNELS", "GOOGLE_ADMIN"
].map(p => { return { label: p, value: p } })

const getPermissions = function(input, callback) {
  setTimeout(() => { callback(null, { options: permissions, complete: true }) }, 2000)
};

const permissionAccess = [
  { value: "CREATE", label: "Create" },
  { value: "EDIT", label: "Edit" },
  { value: "DELETE", label: "Delete" },
  { value: "VIEW", label: "View" }
]

const contextClasses = [
  "BCUser", "GoogleUser", "SlackUser", "DropboxUser", "ZendeskUser",
  "BCGroup", "GoogleGroup", "SlackGroup", "DropboxGroup", "ZendeskGroup",
  "BCAsset", "SlackFile", "SlackFolder", "DropboxFile", "DropboxFolder"
].map(cc => { return { label: cc, value: cc } })

const accessControlFormDef = FormDef.List({
  fields: [
    FieldDef.AsyncSelect({ label: 'Permission', path: '$.key', choices: getPermissions }),
    FieldDef.Select({ label: 'Access', path: '$.access', choices: permissionAccess, multi: true }),
  ]
})

const parameterFormDef = FormDef.List({
  fields: [
    FieldDef.String({ label: 'id', path: '$.id', defaultValue: uuid, readOnly: true }),
    FieldDef.String({ label: 'name', path: '$.name' }),
    FieldDef.Bool({ label: 'Required', path: '$.required', defaultValue: true }),
    FieldDef.Tags({ label: 'Context Class', path: '$.contextClass', choices: contextClasses, multi: false }),
    FieldDef.SimpleSelect({ label: 'Type', path: '$.type', defaultValue: 'ID', choices: parameterTypes }),
  ]
})

const actionFormDef = FormDef.of({
  collection: 'actions',
  fields: [
    FieldDef.UUID({ label: 'Id', path: '$.id' }),
    FieldDef.String({ label: 'Name', path: '$.name' }),
    FieldDef.Bool({ label: 'Enabled', path: '$.ae.enabled', defaultValue: true }),
    FieldDef.Bool({ label: 'Visible', path: '$.ae.visible', defaultValue: true }),
    FieldDef.Bool({ label: 'Deprecated', path: '$.ae.deprecated' }),
    FieldDef.Json({ label: 'Meta', path: '$.ae.meta', defaultValue: '{}' }),
    FieldDef.EmbeddedList({ label: 'Access Control Checks', path: '$.ae.accessControlChecks', formDef: accessControlFormDef }),
    FieldDef.AsyncSelect({ label: 'Provider', path: '$.ae.providerId', defaultValue: 'uuid-bettercloud-1234', choices: getProviders }),
    FieldDef.EmbeddedList({ label: 'Parameters', path: '$.ae.parameters', formDef: parameterFormDef }),

    // TODO: custom steps form field? could be done with drag and drop? http://jsfiddle.net/vacidesign/uskx816g/
  ]
})

const model = {
  // id: "aaa-1111-bbbb-22",
  ae: {
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
    "parameters": [
      {
        "id": "5d8e76cd-a054-4c6d-ae10-a5f950131889",
        "name": "userId",
        "required": true,
        "contextClass": "SlackUser",
        "type": "ID"
      }
    ]
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
