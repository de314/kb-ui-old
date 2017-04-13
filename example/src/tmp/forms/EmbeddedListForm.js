import React from 'react'
import _ from 'lodash'
import { compose, withState, withHandlers } from 'recompose'
import jsonpath from 'kb-path'
import FormDef from './FormDef'
import FieldFactory from './FieldFactory'

import PropTypes from 'prop-types'

const EmbeddedListForm = ({ definition, modelState, setModelState, onChange }) => {
  const onEmbeddedChange = (model, path, val) => {
    jsonpath.set(model, path, val);
    onChange(modelState);
  }
  return (
    <div className="EmbeddedListForm">
      { modelState.map((model, i) => {
          definition.fields.map((field, j) => (
            <div key={j + "@" + i}>
              {FieldFactory.render(field, model, onEmbeddedChange)}
            </div>
          ))
        })
      }
    </div>
  );
}

EmbeddedListForm.propTypes = {
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
      setModelState(modelState);
      if (_.isFunction(onChange)) {
        onChange(modelState)
      }
    }
  })
)(EmbeddedListForm)
