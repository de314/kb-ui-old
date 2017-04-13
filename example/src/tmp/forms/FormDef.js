import _ from 'lodash'

const formDefaults = {
  //modelType: undefined,
  type: 'simple',
  fields: [],
}

function FormDef(options) {
  _.assignIn(this, formDefaults, _.defaultTo(options, {}));
}

FormDef.of = (options) => new FormDef(options)
FormDef.Embedded = (options) => FormDef.of(_.assignIn({ type: 'embedded' }, _.defaultTo(options, {})))
FormDef.List = (options) => FormDef.of(_.assignIn({ type: 'list' }, _.defaultTo(options, {})))
FormDef.MixedList = (options) => FormDef.of(_.assignIn({ type: 'mixed', subDefs: [] }, _.defaultTo(options, {})))

export default FormDef
