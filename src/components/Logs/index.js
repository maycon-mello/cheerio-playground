import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './style.scss';

@CSSModules(Styles)
export default class Logs extends Component {

  render() {
    let logs = this.props.logs.map(log => {
      return <div styleName='log'>{log}</div>
    });

    return (
      <div styleName='container'>
        { logs }
      </div>
    );
  }
}
