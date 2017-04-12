import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const SimpleFormGroup = ({ label, children }) => {
  return (
    <div className="form-group">
      { _.isUndefined(label) ? '' : (<label>{ label }</label>) }
      { children }
    </div>
  );
}

SimpleFormGroup.propTypes = {
  label: PropTypes.node,
}

export default SimpleFormGroup
