import React from 'react'

import StringField from './StringField'
import BoolField from './BoolField'
import EmailField from './EmailField'

import AceEditorField from './AceEditorField'

const FieldFactory = {
  string: {
    name: 'String',
    type: 'string',
    render: (field, model, onChange) => <StringField field={field} model={model} onChange={onChange} />
  },

  email: {
    name: 'Email',
    type: 'email',
    render: (field, model, onChange) => <EmailField field={field} model={model} onChange={onChange} />
  },

  bool: {
    name: 'Bool',
    type: 'bool',
    render: (field, model, onChange) => <BoolField field={field} model={model} onChange={onChange} />
  },

  code: {
    name: 'Code',
    type: 'code',
    render: (field, model, onChange) => <AceEditorField field={field} model={model} onChange={onChange} />
  },


}

FieldFactory.render = (field, model, onChange) => {
  const factory = FieldFactory[field.type];
  if (!!factory) {
    return factory.render(field, model, onChange);
  }
}

export default FieldFactory
