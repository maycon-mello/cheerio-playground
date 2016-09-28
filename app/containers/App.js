import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Styles from './App.scss';

import * as CodeActions from '../actions/code';
import * as LogActions from '../actions/logs';

import HTMLEditor from '../components/HTMLEditor';
import JavaScriptEditor from '../components/JavaScriptEditor';
import RawOutput from '../components/RawOutput';
import RenderedOutput from '../components/RenderedOutput';
import ActionBar from '../components/ActionBar';
import Logs from '../components/Logs';

@CSSModules(Styles)
export class App extends Component {

  render() {
    const { code, logs, actions } = this.props;
    let columnStyle = logs.logsVisible ? 'columnLogs' : 'column';

    return (
      <div styleName="app">
        <div styleName="actionBar">
          <ActionBar {...logs} {...actions}/>
        </div>

        <div styleName={columnStyle}>
          <HTMLEditor
            htmlSource={code.htmlSource}
            setHtmlSource={actions.setHtmlSource}
          />
          <JavaScriptEditor
            js={code.js}
            setJs={actions.setJs}
          />
        </div>

        <div styleName={columnStyle}>
          <RawOutput htmlOutput={code.htmlOutput}/>
          <RenderedOutput htmlOutput={code.htmlOutput}/>
        </div>
        {
          logs.logsVisible &&
            <div styleName="logs">
              <Logs {...logs}/>
            </div>
        }
      </div>
    );
  }

  componentDidMount() {
    this.props.actions.run();
  }

  static propTypes = {
    run: PropTypes.func,
    code: PropTypes.object,
    logs: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func),
  }

}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(CodeActions, dispatch),
    ...bindActionCreators(LogActions, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
