import React, { Component, PropTypes } from 'react';

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

  onChange(newValue) {
    this.props.onChange(newValue);
  }

  render() {
    let name = 'editor' + new Date().getTime();
    let value = this.props.value || '';

    return (
      <div>
        <h2>{ this.props.title }</h2>
        <AceEditor
          mode={this.props.mode}
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
