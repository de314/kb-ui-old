import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ProviderDef from '../ProviderDef'
import { compose, setPropTypes, withState, withHandlers, lifecycle } from 'recompose'
import ViewDef from '../ViewDef'
import ViewFactory from '../ViewFactory'

import { Pagination } from 'react-bootstrap'

const defaultPageOptions = {
  prev: true,
  next: true,
  first: true,
  last: true,
  ellipsis: true,
  boundaryLinks: false,
  // items
  maxButtons: 5,
  // activePage
  // onSelect
}

function toPage(limit, offset) {
  return Math.floor(offset / limit) + 1;
}

// const PagedContainer = ({}) => {
//   return (
//     <div className="PagedContainer">
//       <h1>Hello, World!</h1>
//     </div>
//   );
// }

const PagedContainer = ({ paginationOptions = {}, pagination, onPageChange, subViewDef, model }) => {
  const { limit, offset, totalPages } = pagination,
      paginationConfig = _.assignIn({}, defaultPageOptions, paginationOptions);
  return (
    <div className="PagedContainer">
      <div className="content-row">
        {ViewFactory.render(subViewDef, model)}
      </div>
      <div className="pagination-row">
        <Pagination
          {...paginationConfig}
          items={totalPages}
          activePage={toPage(limit, offset)}
          onSelect={onPageChange}
        />
      </div>
    </div>
  );
}

// TODO: centralize refresh models functionality
function refreshPage(provider, pagination, setPagination, setModel) {
  const { limit, offset } = pagination
  pagination.loading = true;
  setPagination(pagination);
  Promise.resolve(provider.findAll(limit, offset)).then(res => {
    _.assignIn(pagination, { loading: false, offset: offset, totalPages: toPage(limit, res.total) })
    setPagination(pagination)
    setModel(res.items);
  });
}

export default compose(
  setPropTypes({
    provider: PropTypes.instanceOf(ProviderDef).isRequired,
    subViewDef: PropTypes.instanceOf(ViewDef).isRequired,
    paginationOptions: PropTypes.object,
  }),
  withState('pagination', 'setPagination', ({ pagination = {} }) => _.assignIn({ limit: 20, offset: 0, loading: true, totalPages: 0 }, pagination)),
  withState('model', 'setModel', []),
  withHandlers({
    onPageChange: props => newPage => {
      const { provider, pagination, setPagination, setModel } = props,
          { loading, limit } = pagination;
      if (!loading) {
        pagination.offset = (newPage - 1) * limit;
        refreshPage(provider, pagination, setPagination, setModel);
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      const { provider, pagination, setPagination, setModel } = this.props;
      refreshPage(provider, pagination, setPagination, setModel);
    },
  })
)(PagedContainer)
