import React from 'react'
import PropTypes from 'prop-types'
import jsonpath from 'kb-path'

import { Label } from 'react-bootstrap'

import FieldDef from '../FieldDef'
import SimpleViewGroup from './SimpleViewGroup'

const TagsField = ({ field, model }) => {
  const { label, path } = field,
      value = jsonpath.path(model, path);
  return (
    <div className="TagsField">
      <SimpleViewGroup label={label}>
        { value.map((val, i) => (
            <Label bsStyle="default" key={i}>{val}&nbsp;</Label>
          ))
        }
      </SimpleViewGroup>
    </div>
  );
}

TagsField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
}

export default TagsField
