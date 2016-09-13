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
    const { code, run } = this.props;

    return (
      <div styleName="app">
        <div styleName='actionBar'>
          <ActionBar run={run}/>
        </div>
        <div styleName='column'>
          <HTMLEditor {...code}/>
          <JavaScriptEditor {...code}/>
        </div>

        <div styleName='column'>
          <RawOutput {...code}/>
          <RenderedOutput {...code} run={run}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state ;
const mapDispatchToProps = dispatch => bindActionCreators(CodeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
