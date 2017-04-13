import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import defaultValueHoc from './defaultValueHoc'

import FieldDef from '../FieldDef'
import SimpleFormGroup from './SimpleFormGroup'

const StringField = ({ field, model, onChange }) => {
  const { label, path, readOnly = false } = field,
      value = jsonpath.path(model, field.path);
  return (
    <div className="KbStringField">
      <SimpleFormGroup label={label}>
        <input type="text" onChange={e => onChange(path, e.target.value)} className="form-control" disabled={readOnly} value={value} />
      </SimpleFormGroup>
    </div>
  );
}

StringField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default defaultValueHoc(StringField)
