import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import CodeEditor, { EditorMode } from '../CodeEditor';
import Styles from './style.scss';

@CSSModules(Styles, { allowMultiple: true })
export default class ActionBar extends Component {

  render() {
    const { logs, run, clearLogs, showLogs, logsVisible } = this.props;
    let logStyle = logsVisible ? 'logs active' : 'logs';
    let logsInfo = !logsVisible ? <span>{logs.length}</span> : null;
    return (
      <div>
        <button styleName='run' onClick={run}>
          <i className='fa fa-play'/> Run
        </button>
        <button styleName={logStyle} onClick={() => { showLogs(!logsVisible)}}>
          <i className='fa fa-comment'/> Logs {logs.length > 0 && logsInfo }
        </button>
        <button styleName='clearLogs' onClick={clearLogs}>
          <i className='fa fa-ban'/>Clear logs
        </button>
        <a target='_blank' styleName='github' href="https://github.com/maycon-mello/cheerio-playground">
          <i className="fa fa-github" />
        </a>
      </div>
    );
  }
}
