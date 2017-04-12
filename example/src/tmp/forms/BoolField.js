import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import defaultValueHoc from './defaultValueHoc'

import FieldDef from './FieldDef'
import SimpleFormGroup from './SimpleFormGroup'

const BoolField = ({ field, model, onChange }) => {
  const { label, path } = field,
      value = jsonpath.path(model, field.path);
  return (
    <div className="KbStringField">
      <SimpleFormGroup label={label}>
        <input type="checkbox" onChange={e => onChange(path, e.target.checked)} checked={value} />
      </SimpleFormGroup>
    </div>
  );
}

BoolField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default defaultValueHoc(BoolField)
