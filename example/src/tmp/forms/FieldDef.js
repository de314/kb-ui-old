import _ from 'lodash'

const fieldDefaults = {
  type: 'string'
}

/*
 * Options:
 *   string   type:            the type of data (default: string)
 *   jsonpath path:            the jsonpath to the value in the model
 *   string   [label]:         the field label
 *   string   [defaultValue]:  if the value does not exist at `path` then this value is used
 */
function FieldDef(options) {
  _.assignIn(this, fieldDefaults, _.defaultTo(options, {}));
}

FieldDef.of = (options) => new FieldDef(options)
FieldDef.String = (options) => FieldDef.of(_.assignIn({ type: 'string', defaultValue: ''}, _.defaultTo(options, {})))
FieldDef.Email = (options) => FieldDef.of(_.assignIn({ type: 'email', defaultValue: ''}, _.defaultTo(options, {})))
FieldDef.Bool = (options) => FieldDef.of(_.assignIn({ type: 'bool', defaultValue: false}, _.defaultTo(options, {})))
FieldDef.Text = (options) => FieldDef.of(_.assignIn({ type: 'text', defaultValue: ''}, _.defaultTo(options, {})))


export default FieldDef
