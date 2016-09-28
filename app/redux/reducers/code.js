import {
  SET_JS,
  SET_HTML_SOURCE,
  SET_HTML_OUTPUT,
  SET_AUTO_RUN,
} from '../actions/code';

import * as examples from '../data/examples';

const { htmlSource, js } = examples.start;

export const DEFAULT_STATE = {
  htmlSource,
  js,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_JS:
      return {
        ...state,
        js: action.value,
      };

    case SET_HTML_SOURCE:
      return {
        ...state,
        htmlSource: action.value,
      };

    case SET_HTML_OUTPUT:
      return {
        ...state,
        htmlOutput: action.value,
      };

    case SET_AUTO_RUN:
      return {
        ...state,
        autoRun: action.value,
      };

    default:
      return state;
  }
}
