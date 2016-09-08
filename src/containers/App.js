import React, { Component } from 'react';
import HTMLEditor from '../components/HTMLEditor';
import JavaScriptEditor from '../components/JavaScriptEditor';
import RawOutput from '../components/RawOutput';
import RenderedOutput from '../components/RenderedOutput';
import ActionBar from '../components/ActionBar';

export default class App extends Component {


  render() {
    return (
      <div className='row'>
        <ActionBar />

        <div className='column'>
          <HTMLEditor />
          <JavaScriptEditor />
        </div>

        <div className='column'>
          <RawOutput />
          <RenderedOutput />
        </div>
      </div>
    );
  }
}
