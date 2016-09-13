import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import CodeEditor, { EditorMode } from '../CodeEditor';
import Styles from './style.scss';

@CSSModules(Styles)
export default class ActionBar extends Component {

  render() {
    return (
      <div>
        <button
          styleName='run'
          onClick={this.props.run}>
          Run
        </button>
      </div>
    );
  }
}
