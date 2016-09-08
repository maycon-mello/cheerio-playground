import React, { Component, PropTypes } from 'react';

import CodeEditor, { EditorMode } from '../CodeEditor';

export default class RenderedOutput extends Component {

  componentDidMount() {
    this.props.run();
  }

  render() {

    return (
      <div className='output-view'>
        <h2>Raw output</h2>
        <div
          className='content'
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </div>
    );
  }

  createMarkup() {
    return {
      __html: this.props.htmlOutput,
    }
  }


}
