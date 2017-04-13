import React from 'react'
import _ from 'lodash'
import { compose, withState, withHandlers } from 'recompose'
import jsonpath from 'kb-path'
import FormDef from './FormDef'
import FieldFactory from './FieldFactory'

import PropTypes from 'prop-types'

const EmbeddedFormField = ({ definition, modelState, setModelState, onChange }) => {
  return (
    <div className="EmbeddedFormField">
      { definition.fields.map((field, i) => (
        <div key={i}>
          {FieldFactory.render(field, modelState, onChange)}
        </div>
      )) }
    </div>
  );
}

EmbeddedFormField.propTypes = {
  definition: PropTypes.instanceOf(FormDef).isRequired,
  onChange: PropTypes.func.isRequired,
  // provided
  modelState: PropTypes.object.isRequired,
  setModelState: PropTypes.func.isRequired,
}

export default compose(
  withState('modelState', 'setModelState', props => props.model),
  withHandlers({
    onChange: props => (path, val) => {
      const { modelState, setModelState, onChange } = props;
      jsonpath.set(modelState, path, val);
      setModelState(modelState);
      if (_.isFunction(onChange)) {
        onChange(modelState)
      }
    }
  })
)(EmbeddedFormField)
