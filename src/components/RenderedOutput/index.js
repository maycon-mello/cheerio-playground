import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './style.scss';

@CSSModules(Styles)
export default class RenderedOutput extends Component {

  render() {
    let html = 'data:text/html;charset=utf-8,' + encodeURI(this.props.htmlOutput);
    return (
      <div styleName='container'>
        <h2>Rendered output</h2>
        <iframe styleName='content' src={html} />
      </div>
    );
  }

}
