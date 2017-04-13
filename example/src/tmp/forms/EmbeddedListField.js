import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import FormDef from './FormDef'
import EmbeddedFormField from './EmbeddedFormField'

const EmbeddedListField = ({ field, model: models, onChange, addOne, removeOne }) => {
  return (
    <div className="EmbeddedListField">
      <div className="title">{ _.defaultTo(field.label, '')}</div>
      { models.map((model, i) => (
        <div className="list-item" key={i}>
          <EmbeddedFormField field={field} model={model} onChange={onChange} />
          <div className="remove-row">
            <button onClick={(e) => { e.preventDefault(); removeOne(i)}}>{ _.defaultTo(field.removeText, 'Remove')}</button>
          </div>
        </div>
      ))
      }
      <div className="add-one-row">
        <button onClick={(e) => { e.preventDefault(); addOne()}}>{ _.defaultTo(field.addText, '+ Add One')}</button>
      </div>
    </div>
  );
}

EmbeddedListField.propTypes = {
  field: PropTypes.shape({
    path: PropTypes.string.isRequired,
    formDef: PropTypes.instanceOf(FormDef).isRequired,
    addText: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  // provided
  model: PropTypes.array.isRequired,
  addOne: PropTypes.func.isRequired,
  removeOne: PropTypes.func.isRequired,
}

export default compose(

  withHandlers({
    onChange: props => () => {
      const { field, model: models, onChange } = props;
      onChange(field.path, models);
    },
    addOne: props => () => {
      const { field, model: models, onChange } = props,
          defaultItem = _.isFunction(field.defaultItem) ? field.defaultItem() : field.defaultItem;
      models.push(_.defaultTo(defaultItem, {}));
      onChange(field.path, models);
    },
    removeOne: props => (index) => {
      const { field, model: models, onChange } = props;
      models.splice(index, 1);
      onChange(field.path, models);
    }
  })
)(EmbeddedListField)
