import React from 'react'
import _ from 'lodash'
import jsonpath from 'kb-path'

import StringField from './StringField'
import BoolField from './BoolField'
// import EmailField from './EmailField'
// import UrlField from './UrlField'
// import SimpleSelectField from './SimpleSelectField'
// import SelectField from './SelectField'
// import AsyncSelectField from './AsyncSelectField'
// import TagsField from './TagsField'
import AceEditorField from '../forms/AceEditorField'
import TagsField from './TagsField'

import ListView from './ListView';

const FieldFactory = {
  string: {
    name: 'String',
    type: 'string',
    render: (field, model) => <StringField field={field} model={model} />
  },

  // email: {
  //   name: 'Email',
  //   type: 'email',
  //   render: (field, model) => <EmailField field={field} model={model} />
  // },

  bool: {
    name: 'Bool',
    type: 'bool',
    render: (field, model) => <BoolField field={field} model={model} />
  },

  // simpleSelect: {
  //   name: 'Simple Select',
  //   type: 'simpleSelect',
  //   render: (field, model) => <SimpleSelectField field={field} model={model} />
  // },
  //
  // select: {
  //   name: 'Select',
  //   type: 'select',
  //   render: (field, model) => <SelectField field={field} model={model} />
  // },
  //
  // asyncSelect: {
  //   name: 'Async Select',
  //   type: 'asyncSelect',
  //   render: (field, model) => <AsyncSelectField field={field} model={model} />
  // },

  tags: {
    name: 'Tags',
    type: 'tags',
    render: (field, model) => <TagsField field={field} model={model} />
  },

  code: {
    name: 'Code',
    type: 'code',
    render: (field, model) => <AceEditorField field={field} model={model} onChange={() => {}} />
  },

  // embeddedForm: {
  //   name: 'Embedded Form',
  //   type: 'embeddedForm',
  //   render: (field, model) => <EmbeddedFormField field={field} model={field.getDefaultValue(model)} />
  // },

  embeddedList: {
    name: 'Embedded List',
    type: 'embeddedList',
    render: (field, model) => <ListView definition={field.viewDef} model={jsonpath.path(model, field.path)} />
  }
}

FieldFactory.render = (field, model) => {
  const factory = FieldFactory[field.type];
  if (!!factory) {
    return factory.render(field, model);
  }
}

export default FieldFactory
