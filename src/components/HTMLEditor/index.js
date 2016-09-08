import React, { Component, PropTypes } from 'react';
import CodeEditor, { EditorMode } from '../CodeEditor';

export default class JsEditor extends Component {

  render() {
    let { htmlSource, setHtmlSource } = this.props;
    return (
      <CodeEditor
        title='Input HTML'
        mode={EditorMode.html}
        value={htmlSource}
        onChange={setHtmlSource}
      />
    );
  }
}
