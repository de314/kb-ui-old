import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import FieldDef from '../FieldDef'
import SimpleViewGroup from './SimpleViewGroup'

const StringField = ({ field, model }) => {
  const { label, path } = field,
      value = jsonpath.path(model, path);
  return (
    <div className="KbViewStringField">
      <SimpleViewGroup label={label}>
        { value }
      </SimpleViewGroup>
    </div>
  );
}

StringField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
}

export default StringField
