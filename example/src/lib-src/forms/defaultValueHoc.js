import { compose, lifecycle } from 'recompose'
import _ from 'lodash'
import jsonpath from 'kb-path'

export default compose(
  lifecycle({
    componentWillMount() {
      const { field, model, onChange } = this.props,
          value = jsonpath.path(model, field.path);
      if (_.isUndefined(value) && !_.isUndefined(field.defaultValue)) {
        const defaultVal = _.isFunction(field.defaultValue) ? field.defaultValue() : field.defaultValue
        onChange(field.path, defaultVal)
      }
    },
  })
)
