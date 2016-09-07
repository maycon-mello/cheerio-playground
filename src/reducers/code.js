import {
  SET_JS,
  SET_HTML_SOURCE,
  SET_HTML_OUTPUT,
} from '../actions/code';

const DEFAULT_STATE = {
  js: '',
  htmlSource: '',
  htmlOutput: '',
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_JS:
      return {
        ...state,
        jsCode: action.value,
      };

    default:
      return state;
  }
}
