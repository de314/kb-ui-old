import React from 'react'
import _ from 'lodash'
import { compose, withState, withHandlers } from 'recompose'
import jsonpath from 'kb-path'
import FormDef from './FormDef'
import FieldFactory from './FieldFactory'

import PropTypes from 'prop-types'

const Form = ({ definition, modelState, setModelState, onSubmit, onChange }) => {
  const myOnSubmit = (e) => { e.preventDefault(); onSubmit(_.cloneDeep(modelState)) }
  return (
    <div className="Form">
      <form onSubmit={myOnSubmit}>
        { definition.fields.map((field, i) => (
          <div key={i}>
            {FieldFactory.render(field, modelState, onChange)}
          </div>
        )) }
        <div className="form-btn-row">
          <button className="form-submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

Form.propTypes = {
  definition: PropTypes.instanceOf(FormDef).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  // provided
  modelState: PropTypes.object.isRequired,
  setModelState: PropTypes.func.isRequired,
}

export default compose(
  withState('modelState', 'setModelState', props => _.cloneDeep(props.model)),
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
)(Form)
