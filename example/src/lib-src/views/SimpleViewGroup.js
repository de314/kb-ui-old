import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const SimpleViewGroup = ({ label, children }) => {
  return (
    <span className="SimpleViewGroup">
      { _.isUndefined(label) ? '' : (<span className="view-label">{label}</span>) }
      <span className="view-value">{children}</span>
    </span>
  );
}

SimpleViewGroup.propTypes = {
  label: PropTypes.node,
}

export default SimpleViewGroup
