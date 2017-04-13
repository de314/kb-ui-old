import React from 'react'

import View from './views/View'
import ListView from './views/ListView'

const ViewFactory = {
  simple: {
    name: 'Simple View',
    type: 'simple',
    render: (definition, model) => <View definition={definition} model={model} />
  },

  list: {
    name: 'List View',
    type: 'list',
    render: (definition, model, onChange, onSubmit) => <ListView definition={definition} model={model} />
  },

}

ViewFactory.render = (definition, model) => {
  const factory = ViewFactory[definition.type];
  if (!!factory) {
    return factory.render(definition, model);
  }
}

export default ViewFactory
