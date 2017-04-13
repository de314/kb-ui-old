import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import defaultValueHoc from './defaultValueHoc'

import FieldDef from './FieldDef'
import { Creatable } from 'react-select';
import SimpleFormGroup from './SimpleFormGroup'

// TODO: https://github.com/JedWatson/react-select#user-created-tags

const TagsField = ({ field, model, onChange }) => {
  const { label, path, readOnly = false, choices, multi = true } = field,
      value = jsonpath.path(model, field.path);
  return (
    <div className="KbSelectField">
      <SimpleFormGroup label={label}>
        <Creatable
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

TagsField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default defaultValueHoc(TagsField)
