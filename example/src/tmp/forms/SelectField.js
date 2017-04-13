import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import defaultValueHoc from './defaultValueHoc'

import FieldDef from './FieldDef'
import Select from 'react-select'
import SimpleFormGroup from './SimpleFormGroup'

const SelectField = ({ field, model, onChange }) => {
  const { label, path, readOnly = false, choices, multi = false } = field,
      value = jsonpath.path(model, field.path);
  return (
    <div className="KbSelectField">
      <SimpleFormGroup label={label}>
        <Select
          value={value}
          options={choices}
          onChange={(val) => onChange(path, multi ? val.map(v => v.value) : val.value)}
          disabled={readOnly}
          multi={multi}
        />
      </SimpleFormGroup>
    </div>
  );
}

SelectField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default defaultValueHoc(SelectField)
