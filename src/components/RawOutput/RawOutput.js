import React, { Component, PropTypes } from 'react';
import CodeEditor, { EditorMode } from '../CodeEditor';

export default class RawOutput extends Component {

  render() {
    let { htmlOutput } = this.props;

    return (
      <CodeEditor
        title="Raw output"
        mode={EditorMode.html}
        readOnly
        value={htmlOutput}
      />
    );
  }

  static propTypes = {
    htmlOutput: PropTypes.string,
  }
}
