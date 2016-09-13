import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import HTMLEditor from './index';
import CodeEditor from '../CodeEditor';

let props = {
  htmlSource: 'source',
};

describe('<HTMLEditor />', () => {

  it('should render a CodeEditor component', () => {
    const app = shallow( <HTMLEditor {...props}/>);
    expect(app.find(CodeEditor)).to.have.length(1);
  });

  it('should call setHtmlSource after editor change', () => {
    const setHtmlSource = spy();
    const app = shallow(
      <HTMLEditor
        htmlSource='test'
        setHtmlSource={setHtmlSource}
      />
    );
    const editor = app.find(CodeEditor);
    const onChange = editor.node.props.onChange;
    expect(onChange).to.be.a('function');
    expect(editor).to.have.length(1);

    onChange.apply(null, ['new value']);
    expect(onChange).to.have.property('callCount', 1);
  });

});
