import React, { Component } from 'react';
import HTMLEditor from './HTMLEditor';
import JavaScriptEditor from './JavaScriptEditor';
import RawOutput from './RawOutput';
import RenderedOutput from './RenderedOutput';
import ActionBar from './ActionBar';

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
