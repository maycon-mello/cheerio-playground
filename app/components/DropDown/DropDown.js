import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import Styles from './DropDown.scss';

@CSSModules(Styles)
export default class DropDown extends Component {

  render() {
    return (
      <div>Drop down</div>
    );
  }
}
