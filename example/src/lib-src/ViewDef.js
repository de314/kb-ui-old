import _ from 'lodash'

const viewDefaults = {
  //modelType: undefined,
  type: 'simple',
  fields: [],
}

function ViewDef(options) {
  _.assignIn(this, viewDefaults, _.defaultTo(options, {}));
}

ViewDef.of = (options) => new ViewDef(options)
ViewDef.List = (options) => ViewDef.of(_.assignIn({ type: 'list' }, _.defaultTo(options, {})))
ViewDef.Table = (options) => ViewDef.of(_.assignIn({ type: 'table' }, _.defaultTo(options, {})))

ViewDef.Panels = (options) => ViewDef.of(_.assignIn({ type: 'panels' }, _.defaultTo(options, {})))
ViewDef.Tiles = (options) => ViewDef.of(_.assignIn({ type: 'tiles' }, _.defaultTo(options, {})))
ViewDef.Masonry = (options) => ViewDef.of(_.assignIn({ type: 'masonry' }, _.defaultTo(options, {})))


export default ViewDef
