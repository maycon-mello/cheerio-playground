import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './style.scss';
import uuid from 'uuid';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/theme/github';

const ACE_PROPS = {
  $blockScrolling: true,
}

export const EditorMode = {
  html: 'html',
  js: 'javascript',
}

@CSSModules(Styles)
export default class CodeEditor extends Component {

  onChange = (newValue) => {
    if (!this.props.onChange) {
      return;
    }

    this.props.onChange(newValue);
  }

  render() {
    let name = 'editor' + new Date().getTime();
    let { value, title, mode, readOnly } = this.props;

    return (
      <div styleName='container'>
        <h2>{ title }</h2>
        <AceEditor
          styleName='ace_editor'
          mode={mode}
          theme='github'
          onChange={this.onChange}
          name={name}
          width="100%"
          height="350px"
          readOnly={readOnly || false}
          editorProps={ACE_PROPS}
          value={value}
        />
      </div>
    );
  }
}
