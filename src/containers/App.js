import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './App.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CodeActions from '../actions/code';

import HTMLEditor from '../components/HTMLEditor';
import JavaScriptEditor from '../components/JavaScriptEditor';
import RawOutput from '../components/RawOutput';
import RenderedOutput from '../components/RenderedOutput';
import ActionBar from '../components/ActionBar';

@CSSModules(Styles)
export class App extends Component {

  render() {
    const { code, actions } = this.props;

    return (
      <div styleName="app">
        <div styleName='actionBar'>
          <ActionBar run={actions.run}/>
        </div>
        <div styleName='column'>
          <HTMLEditor {...code} {...actions}/>
          <JavaScriptEditor {...code} {...actions}/>
        </div>

        <div styleName='column'>
          <RawOutput {...code} {...actions}/>
          <RenderedOutput {...code} run={actions.run}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state ;
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CodeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
