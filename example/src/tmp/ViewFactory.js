import React from 'react'

import View from './views/View'
import ListView from './views/ListView'
import TableView from './views/TableView'

const ViewFactory = {
  simple: {
    name: 'Simple View',
    type: 'simple',
    render: (definition, model) => <View definition={definition} model={model} />
  },

  list: {
    name: 'List View',
    type: 'list',
    render: (definition, model) => <ListView definition={definition} model={model} />
  },

  table: {
    name: 'Table View',
    type: 'table',
    render: (definition, model) => <TableView definition={definition} model={model} />
  },

}

ViewFactory.render = (definition, model) => {
  const factory = ViewFactory[definition.type];
  if (!!factory) {
    return factory.render(definition, model);
  }
}

export default ViewFactory
