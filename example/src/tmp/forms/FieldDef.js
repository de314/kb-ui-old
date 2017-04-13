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
 *   bool     [readOnly]:      if the field can be edited
 */
function FieldDef(options) {
  _.assignIn(this, fieldDefaults, _.defaultTo(options, {}));
}

FieldDef.of = (options) => new FieldDef(options)
FieldDef.String = (options) => FieldDef.of(_.assignIn({ type: 'string', defaultValue: ''}, _.defaultTo(options, {})))
FieldDef.Email = (options) => FieldDef.of(_.assignIn({ type: 'email', defaultValue: ''}, _.defaultTo(options, {})))
FieldDef.Bool = (options) => FieldDef.of(_.assignIn({ type: 'bool', defaultValue: false}, _.defaultTo(options, {})))
FieldDef.Text = (options) => FieldDef.of(_.assignIn({ type: 'text', defaultValue: ''}, _.defaultTo(options, {})))

function mapChoices(choices = [ "Loading..." ]) {
  let defaultValue = '';
  if (_.isArray(choices) && choices.length > 0) {
    defaultValue = _.isPlainObject(choices[0]) ? choices[0].value : choices[0];
    choices = new Promise((resolve) => resolve(choices))
  }
  return { choices, defaultValue };
}

FieldDef.Select = (options) => {
  const { choices, defaultValue } = mapChoices(options.choices);
  return FieldDef.of(_.assignIn({ type: 'select', defaultValue }, _.defaultTo(options, {}), { choices }))
}

FieldDef.Code = (options) => FieldDef.of(_.assignIn({ type: 'code', defaultValue: '', mode: 'json', theme: 'github' }, _.defaultTo(options, {})))
FieldDef.Json = (options) => FieldDef.Code(options)
FieldDef.Javascript = (options) => FieldDef.Code(_.assignIn({ mode: 'javascript', theme: 'monokai' }, _.defaultTo(options, {})))
FieldDef.Java = (options) => FieldDef.Code(_.assignIn({ mode: 'java', theme: 'ambiance' }, _.defaultTo(options, {})))


export default FieldDef
