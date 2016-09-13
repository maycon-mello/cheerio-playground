import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './style.scss';
import CodeEditor, { EditorMode } from '../CodeEditor';

@CSSModules(Styles)
export default class RenderedOutput extends Component {

  componentDidMount() {
    this.props.run();
  }

  render() {

    return (
      <div styleName='container'>
        <h2>Raw output</h2>
        <div
          styleName='content'
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </div>
    );
  }

  createMarkup() {
    return {
      __html: this.props.htmlOutput,
    }
  }


}
