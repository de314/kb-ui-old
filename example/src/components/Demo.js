import React from 'react'
import { compose, withState } from 'recompose'
import uuid from 'uuid'

import FormDef from '../tmp/forms/FormDef'
import FormFactory from '../tmp/forms/FormFactory'
import FieldDef from '../tmp/forms/FieldDef'

// https://bitbucket.org/bettercloud/ae-git-bridge-micro/src/31303ff8814fbdee3e9e0b1f82e2c08d98cb02a4/src/main/resources/static/admin/index.html?at=continuous&fileviewer=file-view-default

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
    FieldDef.Bool({ label: 'Enabled', path: '$.enabled' }),
    FieldDef.Bool({ label: 'Deprecated', path: '$.deprecated' }),
    FieldDef.Bool({ label: 'Visible', path: '$.visible' }),
    // FieldDef.Json({ label: 'Meta', path: '$.meta' }),
    // FieldDef.Form({ label: 'Access Control Checks', path: '$.accessControlChecks', defaultValue: [], definition: accessControlFormDef }),
    // FieldDef.Select({ label: 'Provider ID', path: '$.providedId', choices: fetchBcProviders }), // TODO: can do this in one comp? Need `Select` and `SelectFetch` for state management?
    // FieldDef.Form({ label: 'Parameters', path: '$.parameters', defaultValue: [], definition: parameterFormDef }),
    // TODO: custom steps form field? could be done with drag and drop? http://jsfiddle.net/vacidesign/uskx816g/
  ]
})

const model = {
  // id: "aaa-1111-bbbb-22",
  email: "model.email@testing.io"
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
