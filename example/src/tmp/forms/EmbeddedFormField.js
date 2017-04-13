import React from 'react'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import jsonpath from 'kb-path'
import FormDef from './FormDef'
import FieldFactory from './FieldFactory'

import PropTypes from 'prop-types'

const EmbeddedFormField = ({ field, model, onChange }) => {
  return (
    <div className="EmbeddedFormField">
      { field.formDef.fields.map((field, i) => (
        <div key={i}>
          {FieldFactory.render(field, model, onChange)}
        </div>
      )) }
    </div>
  );
}

EmbeddedFormField.propTypes = {
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    formDef: PropTypes.instanceOf(FormDef).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
}

export default compose(
  withHandlers({
    onChange: props => (path, val) => {
      const { field, model, onChange } = props;
      jsonpath.set(model, path, val);
      onChange(field.path, model)
    }
  })
)(EmbeddedFormField)
