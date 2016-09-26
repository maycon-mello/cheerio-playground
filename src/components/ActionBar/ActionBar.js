import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './ActionBar.scss';

const GIT_HUB_LINK = 'https://github.com/maycon-mello/cheerio-playground';

@CSSModules(Styles, { allowMultiple: true })
export default class ActionBar extends Component {

  render() {
    const { logs, run, clearLogs, showLogs, logsVisible } = this.props;
    const logStyle = logsVisible ? 'logs active' : 'logs';
    const logsInfo = !logsVisible ? <span>{logs.length}</span> : null;

    return (
      <div>
        <button styleName="run" onClick={run}>
          <i className="fa fa-play"/> Run
        </button>
        <button styleName={logStyle} onClick={() => { showLogs(!logsVisible); }}>
          <i className="fa fa-comment"/> Logs {logs.length > 0 && logsInfo }
        </button>
        <button styleName="clearLogs" onClick={clearLogs}>
          <i className="fa fa-ban"/>Clear logs
        </button>
        <a target="_blank" styleName="github" href={GIT_HUB_LINK}>
          <i className="fa fa-github"/>
        </a>
      </div>
    );
  }

  static propTypes = ({
    logs: PropTypes.arrayOf(PropTypes.string),
    run: PropTypes.func,
    clearLogs: PropTypes.func,
    showLogs: PropTypes.func,
    logsVisible: PropTypes.bool,
  })
}
