import _ from 'lodash'

const providerDefaults = {
  //modelType: undefined,
  type: 'simple',
  findOne: (id) => ({}),
  findAll: (limit = 20, offset = 0, q = {}) => ({ items: [], limit, offset, q, total: 0 }),
  save: (entity, id) => entity,
  remove: (id) => null,
}

function ProviderDef(options) {
  _.assignIn(this, providerDefaults, _.defaultTo(options, {}));
}

ProviderDef.of = (options) => new ProviderDef(options)

ProviderDef.InMem = (options) => ProviderDef.of(_.assignIn({
  type: 'inMem',
  items: [],
  idField: 'id',
  findOne(id) {
    const matched = this.items.filter(item => item[this.idField] === id)
    return matched.length === 1 ? matched[0] : undefined
  },
  // See https://lodash.com/docs/4.17.4#conforms for q syntax
  findAll(limit = 20, offset = 0, q = {}) {
    const items = this.items.filter(_.conforms(q));
    return {
      items: items.slice(offset, offset + limit),
      limit,
      offset,
      q,
      total: items.length
    }
  },
  save(entity, id) {
    const found = this.findOne(id);
    if (!_.isUndefined(found)) {
      _.assignIn(found, entity);
    } else {
      this.items.push(entity)
    }
  },
  remove(id) {
    const removed = _.remove(this.items, item => item[this.idField] === id)
    return removed.length === 1 ? removed[0] : null
  },
}, _.defaultTo(options, {})))

ProviderDef.Rest = (options) => ProviderDef.of(_.assignIn({
  type: 'rest'
  // TODO
}, _.defaultTo(options, {})))




export default ProviderDef
