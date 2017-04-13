import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const SimpleFormGroup = ({ label, children }) => {
  return (
    <div className="SimpleFormGroup">
      { _.isUndefined(label) ? '' : (
        <span className="form-label"><label>{label}</label></span>
      ) }
      { children }
    </div>
  );
}

SimpleFormGroup.propTypes = {
  label: PropTypes.node,
}

export default SimpleFormGroup
