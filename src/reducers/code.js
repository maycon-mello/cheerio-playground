import {
  SET_JS,
  SET_HTML_SOURCE,
  SET_HTML_OUTPUT,
} from '../actions/code';

export const DEFAULT_STATE = {
  js: '',
  htmlSource: '',
  htmlOutput: '',
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
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

    default:
      return state;
  }
}
