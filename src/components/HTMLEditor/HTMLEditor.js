import React, { Component, PropTypes } from 'react';
import CodeEditor, { EditorMode } from '../CodeEditor';

export default class HTMLEditor extends Component {

  render() {
    let { htmlSource, setHtmlSource } = this.props;
    return (
      <CodeEditor
        title="Input HTML"
        mode={EditorMode.html}
        value={htmlSource}
        onChange={setHtmlSource}
      />
    );
  }

  static propTypes = {
    htmlSource: PropTypes.string,
    setHtmlSource: PropTypes.func,
  }
}
