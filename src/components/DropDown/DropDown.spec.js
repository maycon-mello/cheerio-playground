import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import DropDown from './index';

describe('<DropDown />', () => {
  it('should render component', () => {
    const component = shallow(<DropDown />);
    expect(component.find('div')).to.have.length(1);
  });
});
