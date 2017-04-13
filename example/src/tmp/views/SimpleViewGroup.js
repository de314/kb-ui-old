import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const SimpleViewGroup = ({ label, children }) => {
  return (
    <span className="SimpleViewGroup">
      <span className="view-label">{_.defaultTo(label, '')}</span>
      <span className="view-value">{children}</span>
    </span>
  );
}

SimpleViewGroup.propTypes = {
  label: PropTypes.node,
}

export default SimpleViewGroup
