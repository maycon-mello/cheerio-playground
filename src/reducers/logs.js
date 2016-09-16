import {
  ADD_LOG,
  CLEAR_LOGS,
  SHOW_LOGS,
  SET_PRESERVE_LOGS,
} from '../actions/logs';

export const DEFAULT_STATE = {
  logs: [],
  logsVisible: false,
  preserveLogs: false,
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
      }

    case ADD_LOG:
      let logs = [...state.logs, action.value];
      return {
        ...state,
        logs,
      }

    case SHOW_LOGS:
      return {
        ...state,
        logsVisible: action.value,
      }

    case SET_PRESERVE_LOGS:
      return {
        ...state,
        preserveLogs: action.value,
      }

    default:
      return state;
  }
}
