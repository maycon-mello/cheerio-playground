import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { App } from './App';

import HTMLEditor from '../components/HTMLEditor';
import JavaScriptEditor from '../components/JavaScriptEditor';

let props = {
  code: {
    js: 'test'
  }
};

describe('<App />', () => {

  it('should render a HTMLEditor component', () => {
    const app = shallow(<App {...props} />);
    expect(app.find(HTMLEditor)).to.have.length(1);
  });

  it('should render a JavaScriptEditor component', () => {
    const app = shallow(<App {...props} />);
    expect(app.find(JavaScriptEditor)).to.have.length(1);
  });

});
