import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Codemirror from 'react-codemirror';

import Styles from './CodeEditor.scss';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/addon/scroll/simplescrollbars.js');
require('codemirror/addon/scroll/simplescrollbars.css');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');

@CSSModules(Styles)
export default class CodeEditor extends Component {

  onChange = (newValue) => {
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(newValue);
  }

  render() {
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
      <div styleName="container">
        <h2> <i className={`fa fa-${iconName}`}/>{ title }</h2>
        <Codemirror
          value={value}
          onChange={this.onChange}
          options={options}
        />
      </div>
    );
  }

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    title: PropTypes.string,
    mode: PropTypes.string,
    readOnly: PropTypes.bool,
  }
}
