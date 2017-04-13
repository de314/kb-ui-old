import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { compose, withState, lifecycle } from 'recompose'
import jsonpath from 'kb-path'

import defaultValueHoc from './defaultValueHoc'

import FieldDef from './FieldDef'
import SimpleFormGroup from './SimpleFormGroup'

const SimpleSelectField = ({ field, resolvedChoices, model, onChange }) => {
  const { label, path, readOnly = false } = field,
      value = jsonpath.path(model, field.path);
  return (
    <div className="KbSimpleSelectField">
      <SimpleFormGroup label={label}>
        <select onChange={e => onChange(path, e.target.value)} value={value} disabled={readOnly} >
          { resolvedChoices.map(({ value, text }, i) => (
            <option value={value} key={i}>{text}</option>
          ))}
        </select>
      </SimpleFormGroup>
    </div>
  );
}

SimpleSelectField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default compose(
  withState('resolvedChoices', 'resolveChoices', [ { text: 'Loading...' }]),
  lifecycle({
    componentWillMount() {
      const { field, model, onChange, resolveChoices } = this.props,
          value = jsonpath.path(model, field.path);

      field.choices.then(choices => {
        let defaultValue;
        if (_.isString(choices[0])) {
          choices = choices.map(choice => { return { text: choice, value: choice } });
        }
        resolveChoices(choices)
        if (_.isUndefined(value) || value === '') {
          if (!_.isUndefined(field.defaultValue) && field.defaultValue !== '') {
            defaultValue = _.isFunction(field.defaultValue) ? field.defaultValue() : field.defaultValue
          } else {
            defaultValue = choices[0].value
          }
          onChange(field.path, defaultValue)
        }
      });
    }
  })
)(defaultValueHoc(SimpleSelectField))
