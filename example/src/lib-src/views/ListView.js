import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ViewDef from '../ViewDef'

import View from './View'
import SimpleViewGroup from './SimpleViewGroup'

const ListView = ({ definition, model: models }) => {
  return (
    <div className="ListView">
      <div className="list-view-label">{definition.label}</div>
      { models.map((model, i) => (
        <div className="list-view-item" key={i}>
          <View definition={definition} model={model} />
        </div>
      )) }
    </div>
  );
}

ListView.propTypes = {
  definition: PropTypes.instanceOf(ViewDef).isRequired,
  model: PropTypes.array.isRequired,
}

export default ListView
