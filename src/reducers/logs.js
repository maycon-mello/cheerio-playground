import {
  ADD_LOG,
  CLEAR_LOGS
} from '../actions/logs';

const DEFAULT_STATE = {
  logs: [],
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
      }

    case ADD_LOG:
      let logs = [...state.logs, action.log];
      return {
        ...state,
        logs,
      }

    default:
      return state;
  }
}
