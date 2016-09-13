import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Styles from './App.scss';

import HTMLEditor from './HTMLEditor';
import JavaScriptEditor from './JavaScriptEditor';
import RawOutput from './RawOutput';
import RenderedOutput from './RenderedOutput';
import ActionBar from './ActionBar';

@CSSModules(Styles)
export class App extends Component {

  render() {
    return (
      <div styleName="app">
        <div styleName='actionBar'>
          <ActionBar />
        </div>
        <div styleName='column'>
          <HTMLEditor />
          <JavaScriptEditor />
        </div>

        <div styleName='column'>
          <RawOutput />
          <RenderedOutput />
        </div>
      </div>
    );
  }
}

export default App;
