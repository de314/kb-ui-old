import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import FieldDef from '../FieldDef'
import SimpleViewGroup from './SimpleViewGroup'

const BoolField = ({ field, model }) => {
  const { label, path } = field,
      value = jsonpath.path(model, path) + '';
  return (
    <div className="KbBoolField">
      <SimpleViewGroup label={label}>
        <span className={`bool-${value}`}>{ value }</span>
      </SimpleViewGroup>
    </div>
  );
}

BoolField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
}

export default BoolField
