import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './RenderedOutput.scss';

@CSSModules(Styles)
export default class RenderedOutput extends Component {

  render() {
    let { htmlOutput } = this.props;
    let html = 'data:text/html;charset=utf-8,' + encodeURI(htmlOutput);

    return (
      <div styleName="container">
        <h2 styleName="title">Rendered output</h2>
        <iframe styleName="content" src={html}/>
      </div>
    );
  }

  static propTypes = {
    htmlOutput: PropTypes.string,
  }
}
