/**
 * @flow
 *
 */

import { Action } from './types';

export const ADD_LOG = 'ADD_LOG';
export const CLEAR_LOGS = 'CLEAR_LOGS';
export const SHOW_LOGS = 'SHOW_LOGS';
export const SET_PRESERVE_LOGS = 'SET_PRESERVE_LOGS';
export const LOG_COLOR = 'LOG_COLOR';

/**
 * Add a new log
 *
 * @param {string} value
 * @return {Action} action
 */
export function addLog(value: string): Action {
  return {
    type: ADD_LOG,
    value,
  };
}

/**
 * Set preserve logs
 *
 * @param {boolean} value
 * @return {Action} action
 */
export function setPreserveLogs(value: Boolean): Action {
  return {
    type: SET_PRESERVE_LOGS,
    value,
  };
}

/**
 * Hide/Show logs view
 *
 * @param {boolean} value
 * @return {Action} action
 */
export function showLogs(value: Boolean): Action {
  return {
    type: SHOW_LOGS,
    value,
  };
}

/**
 * Clear logs
 *
 * @return {Action} action
 */
export function clearLogs(): Action {
  return {
    type: CLEAR_LOGS,
  };
}
