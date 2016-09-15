export const ADD_LOG = 'ADD_LOG';
export const CLEAR_LOGS = 'CLEAR_LOGS';
export const SHOW_LOGS = 'SHOW_LOGS';

export const addLog = (value) => ({
  type: ADD_LOG,
  value,
});

export const showLogs = (value) => ({
  type: SHOW_LOGS,
  value,
});

export const clearLogs = () => ({
  type: CLEAR_LOGS
});
