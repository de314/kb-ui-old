import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import defaultValueHoc from './defaultValueHoc'

import FieldDef from '../FieldDef'
import SimpleFormGroup from './SimpleFormGroup'

const EmailField = ({ field, model, onChange }) => {
  const { label, path } = field,
      value = jsonpath.path(model, field.path);
  return (
    <div className="KbEmailField">
      <SimpleFormGroup label={label}>
        <input type="email" onChange={e => onChange(path, e.target.value)} className="form-control" value={value} />
      </SimpleFormGroup>
    </div>
  );
}

EmailField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default defaultValueHoc(EmailField)
