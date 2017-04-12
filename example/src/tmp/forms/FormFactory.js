import React from 'react'

import Form from './Form'

const FormFactory = {
  toplevel: {
    name: 'Top Level',
    type: 'toplevel',
    render: (definition, model, onChange, onSubmit) => <Form definition={definition} model={model} onChange={onChange} onSubmit={onSubmit} />
  },
}

FormFactory.render = (definition, model, onChange, onSubmit) => {
  const factory = FormFactory[definition.type];
  if (!!factory) {
    return factory.render(definition, model, onChange, onSubmit);
  }
}

export default FormFactory
