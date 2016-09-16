import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './style.scss';
import uuid from 'uuid';
import Codemirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/addon/scroll/simplescrollbars.js');
require('codemirror/addon/scroll/simplescrollbars.css');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');



// <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/codemirror.css" rel="stylesheet" />
// <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/theme/material.css" rel="stylesheet" />
// <link href="https://codemirror.net/addon/scroll/simplescrollbars.css" rel="stylesheet" />

export const EditorMode = {
  html: 'htmlmixed',
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
    let name = 'editor' + uuid();
    let { value, title, mode, readOnly } = this.props;
    const options = {
			lineNumbers: true,
			readOnly,
			mode,
      theme: 'material',
      scrollbarStyle: 'overlay',
      height: '100%',
      smartIndent: true,
		};
    let iconName = readOnly ? 'eye' : 'code';
    return (
      <div styleName='container'>
        <h2> <i className={`fa fa-${iconName}`}/>{ title }</h2>
        <Codemirror
          ref="editor"
          value={value}
          onChange={this.onChange}
          options={options} />
      </div>
    );
  }
}
