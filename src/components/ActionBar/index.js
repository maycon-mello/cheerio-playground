import React, { Component, PropTypes } from 'react';

import CodeEditor, { EditorMode } from '../CodeEditor';

export default class ActionBar extends Component {

  render() {
    return (
      <div>
        <button>Run</button>
      </div>
    );
  }
}
