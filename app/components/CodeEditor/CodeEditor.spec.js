import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import Codemirror from 'react-codemirror';

import CodeEditor, { EditorMode } from './index';

let props = {
  htmlSource: 'source',
};

describe('<HTMLEditor />', () => {
  it('should render a CodeEditor component', () => {
    const component = shallow(<CodeEditor {...props}/>);
    expect(component.find(Codemirror)).to.have.length(1);
  });

  it('should call onChange after editor change', () => {
    const onChange = spy();
    const editorProps = { htmlSource: 'test', onChange, mode: EditorMode.html };
    const component = shallow(<CodeEditor {...editorProps}/>);
    let codeMirror = component.find(Codemirror).node;
    codeMirror.props.onChange.apply(null, ['new value']);
    expect(codeMirror.props.options.mode).to.be.equal(EditorMode.html);
    expect(onChange).to.have.property('callCount', 1);
  });
});
