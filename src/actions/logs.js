export const ADD_LOG = 'ADD_LOG';
export const CLEAR_LOGS = 'CLEAR_LOGS';
export const SHOW_LOGS = 'SHOW_LOGS';
export const SET_PRESERVE_LOGS = 'SET_PRESERVE_LOGS';
export const LOG_COLOR = 'LOG_COLOR';

export const addLog = (value) => ({
  type: ADD_LOG,
  value,
});

export const setPreserveLogs = (value) => ({
  type: SET_PRESERVE_LOGS,
  value,
});

export const showLogs = (value) => ({
  type: SHOW_LOGS,
  value,
});

export const clearLogs = () => ({
  type: CLEAR_LOGS
});

export const setLogColor = (color) => ({
  type: LOG_COLOR,
  value: color,
});
