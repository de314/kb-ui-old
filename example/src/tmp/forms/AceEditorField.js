import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import jsonpath from 'kb-path'

import defaultValueHoc from './defaultValueHoc'

import FieldDef from './FieldDef'
import SimpleFormGroup from './SimpleFormGroup'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/mode/java'
import 'brace/mode/javascript'
import 'brace/theme/github'
import 'brace/theme/monokai'
import 'brace/theme/ambiance'

const AceEditorField = ({ field, model, onChange }) => {
  const { label, path, mode, theme } = field,
      value = jsonpath.path(model, field.path);
  return (
    <div className="AceEditorField">
      <SimpleFormGroup label={label}>
        <AceEditor
          mode={mode}
          theme={theme}
          width="100%"
          value={value}
          onChange={newValue => onChange(path, newValue)}
          editorProps={{ $blockScrolling: Infinity }}
        />
      </SimpleFormGroup>
    </div>
  );
}

AceEditorField.propTypes = {
  field: PropTypes.instanceOf(FieldDef).isRequired,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

AceEditorField.JSON = "json"
AceEditorField.JAVA = "java"
AceEditorField.JAVASCRIPT = "javascript"

export default defaultValueHoc(AceEditorField)
