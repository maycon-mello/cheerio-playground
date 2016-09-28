import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './Logs.scss';

@CSSModules(Styles)
export default class Logs extends Component {

  render() {
    let { logs } = this.props;
    let items = logs.map((log, idx) => (
      <div styleName="log" key={idx}>
        { log.toString() }
      </div>
    ));

    return (
      <div styleName="container">
        <h2 styleName="title">Logs</h2>
        { items }
      </div>
    );
  }

  static propTypes = {
    logs: PropTypes.arrayOf(PropTypes.string),
  }
}
