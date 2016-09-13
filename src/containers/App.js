import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CodeActions from '../actions/code';

import HTMLEditor from '../components/HTMLEditor';
import JavaScriptEditor from '../components/JavaScriptEditor';
import RawOutput from '../components/RawOutput';
import RenderedOutput from '../components/RenderedOutput';
import ActionBar from '../components/ActionBar';

export class App extends Component {


  render() {
    const { code, run } = this.props;
    console.log(this.props);
    return (
      <div className='row'>
        <ActionBar run={run}/>

        <div className='column'>
          <HTMLEditor {...code}/>
          <JavaScriptEditor {...code}/>
        </div>

        <div className='column'>
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
