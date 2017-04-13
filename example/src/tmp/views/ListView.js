import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ViewDef from '../ViewDef'

import View from './View'

const ListView = ({ definition, model: models }) => {
  return (
    <div className="ListView">
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
