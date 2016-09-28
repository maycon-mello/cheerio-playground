import React, { Component, PropTypes } from 'react';
import CodeEditor, { EditorMode } from '../CodeEditor';

export default class JavaScriptEditor extends Component {

  render() {
    let { js, setJs } = this.props;
    return (
      <CodeEditor
        title="JavaScript"
        mode={EditorMode.js}
        value={js}
        onChange={setJs}
      />
    );
  }

  static propTypes = {
    js: PropTypes.string,
    setJs: PropTypes.func,
  }
}
