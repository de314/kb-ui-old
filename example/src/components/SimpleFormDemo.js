import React from 'react'
import { compose, withState } from 'recompose'
import uuid from 'uuid'

import FormDef from '../lib-src/forms/FormDef'
import FormFactory from '../lib-src/forms/FormFactory'
import FieldDef from '../lib-src/forms/FieldDef'

const form = FormDef.of({
  modelType: 'TestUser',
  fields: [
    FieldDef.String({
      label: 'User Id',
      path: '$.id',
      readOnly: true,
      defaultValue: uuid
    }),
    FieldDef.String({
      label: 'Name',
      path: '$.profile.name',
    }),
    FieldDef.Bool({
      label: 'Suspended',
      path: '$.suspended',
    }),
    FieldDef.Email({
      label: 'Email',
      path: '$.email'
    })
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
      { FormFactory.render(form, model, setCurr, setSaved) }
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
