import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/theme/monokai';

const ACE_PROPS = {
  $blockScrolling: true,
}

export const EditorMode = {
  html: 'html',
  js: 'javascript',
}

export default class CodeEditor extends Component {

  onChange = (newValue) => {
    if (!this.props.onChange) {
      return;
    }

    this.props.onChange(newValue);
  }

  render() {
    let name = 'editor' + new Date().getTime();
    let { value, title, mode } = this.props;

    return (
      <div className='code-view'>
        <h2>{ title }</h2>
        <AceEditor
          mode={mode}
          theme='monokai'
          onChange={this.onChange}
          name={name}
          editorProps={ACE_PROPS}
          value={value}
        />
      </div>
    );
  }
}
