import React, { Component, PropTypes } from 'react';

import CodeEditor, { EditorMode } from '../CodeEditor';

export default class JavaScriptEditor extends Component {

  render() {
    return (
      <CodeEditor
        title='JavaScript'
        mode={EditorMode.js}
      />
    );
  }
}
