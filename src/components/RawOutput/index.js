import React, { Component, PropTypes } from 'react';

import CodeEditor, { EditorMode } from '../CodeEditor';

export default class RawOutput extends Component {

  render() {
    return (
      <CodeEditor
        title='HTML'
        mode={EditorMode.html}
        value=''
      />
    );
  }
}
