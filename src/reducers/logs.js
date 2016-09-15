import {
  ADD_LOG,
  CLEAR_LOGS,
  SHOW_LOGS,
} from '../actions/logs';

export const DEFAULT_STATE = {
  logs: [],
  logsVisible: false,
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

    default:
      return state;
  }
}
