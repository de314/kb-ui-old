import React from 'react'
import _ from 'lodash'
import ViewDef from '../ViewDef'
import FieldFactory from './FieldFactory'

import PropTypes from 'prop-types'

const View = ({ definition, model }) => {
  return (
    <div className="View">
      { definition.fields.map((field, i) => (
        <div key={i}>
          {FieldFactory.render(field, model)}
        </div>
      )) }
    </div>
  );
}

View.propTypes = {
  definition: PropTypes.instanceOf(ViewDef).isRequired,
  model: PropTypes.object.isRequired,
}

export default View
