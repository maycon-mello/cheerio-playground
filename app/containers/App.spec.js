import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { App } from './App';

import HTMLEditor from '../components/HTMLEditor';
import JavaScriptEditor from '../components/JavaScriptEditor';
import configureStore from '../store/configureStore';

const store = configureStore();

const getProps = () => ({
  ...store.getState(),
  actions: {},
});

describe('<App />', () => {
  it('should render a HTMLEditor component', () => {
    const app = shallow(<App {...getProps()}/>);
    expect(app.find(HTMLEditor)).to.have.length(1);
  });

  it('should render a JavaScriptEditor component', () => {
    const app = shallow(<App {...getProps()}/>);
    expect(app.find(JavaScriptEditor)).to.have.length(1);
  });
});
