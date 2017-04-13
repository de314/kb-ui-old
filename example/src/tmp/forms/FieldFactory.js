import React from 'react'
import _ from 'lodash'

import StringField from './StringField'
import BoolField from './BoolField'
import EmailField from './EmailField'
import SimpleSelectField from './SimpleSelectField'
import AceEditorField from './AceEditorField'

import EmbeddedFormField from './EmbeddedFormField'
import EmbeddedListField from './EmbeddedListField'

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

  select: {
    name: 'Select',
    type: 'select',
    render: (field, model, onChange) => <SimpleSelectField field={field} model={model} onChange={onChange} />
  },

  code: {
    name: 'Code',
    type: 'code',
    render: (field, model, onChange) => <AceEditorField field={field} model={model} onChange={onChange} />
  },

  embeddedForm: {
    name: 'Embedded Form',
    type: 'embeddedForm',
    render: (field, model, onChange) => <EmbeddedFormField field={field} model={field.getDefaultValue(model)} onChange={onChange} />
  },

  embeddedList: {
    name: 'Embedded List',
    type: 'embeddedList',
    render: (field, model, onChange) => <EmbeddedListField field={field} model={field.getDefaultValue(model)} onChange={onChange} />
  }
}

FieldFactory.render = (field, model, onChange) => {
  const factory = FieldFactory[field.type];
  if (!!factory) {
    return factory.render(field, model, onChange);
  }
}

export default FieldFactory
