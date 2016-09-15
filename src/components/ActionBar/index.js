import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import CodeEditor, { EditorMode } from '../CodeEditor';
import Styles from './style.scss';

@CSSModules(Styles)
export default class ActionBar extends Component {

  render() {
    const { logs, run, clearLogs, showLogs, logsVisible } = this.props;

    return (
      <div>
        <button styleName='run' onClick={run}>
          <i className='fa fa-play'/>
        </button>
        <button styleName='logs' onClick={() => { showLogs(!logsVisible)}}>
          Logs ({logs.length})
        </button>
        <button styleName='clearLogs' onClick={clearLogs}>
          Clear logs
        </button>
      </div>
    );
  }
}
