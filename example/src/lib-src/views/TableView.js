import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ViewDef from '../ViewDef'
import FieldFactory from './FieldFactory'

import View from './View'
import SimpleViewGroup from './SimpleViewGroup'

const TableView = ({ definition, model: models }) => {
  const { label, fields } = definition;
  return (
    <div className="TableView">
      <div className="list-view-label">{definition.label}</div>
      <table>
        <thead>
          <tr>
            { fields.map((field, i) => (
              <th key={i}>{field.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { models.map((model, i) => (
            <tr key={i}>
              { definition.fields.map((field, j) => (
                <td key={j + '@' + i}>
                  { FieldFactory.render(field, model) }
                </td>
              )) }
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

TableView.propTypes = {
  definition: PropTypes.instanceOf(ViewDef).isRequired,
  model: PropTypes.array.isRequired,
}

export default TableView
