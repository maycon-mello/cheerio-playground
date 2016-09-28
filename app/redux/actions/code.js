/*
 * @flow
 *
 * TODO: move async code to a redux saga
 */
import Parser from '../parsers/client';
import { Action, Dispatch, GetState, ThunkAction } from './types';
import { addLog, clearLogs } from './logs';

export const SET_JS = 'SET_JS';
export const SET_HTML_SOURCE = 'SET_HTML_SOURCE';
export const SET_HTML_OUTPUT = 'SET_HTML_OUTPUT';
export const SET_AUTO_RUN = 'SET_AUTO_RUN';

const AUTO_RUN_DELAY = 150;

let autoRunTimeout: number;

/**
 * Auto run
 * @param {Dispatch} dispatch function
 */
function autoRun(dispatch: Dispatch): void {
  clearTimeout(autoRunTimeout);
  autoRunTimeout = setTimeout(() => dispatch(run()), AUTO_RUN_DELAY);
}

/**
 * Set the html output
 *
 * @param {string} value
 * @return {Action} action
 */
export function setHtmlOutput(value: String): Action {
  return {
    type: SET_HTML_OUTPUT,
    value,
  };
}

/**
 * Enable or disable auto run
 *
 * @param {boolean} value
 * @return {Action} action
 */
export function setAutoRun(value: Boolean): Action {
  return {
    type: SET_AUTO_RUN,
    value,
  };
}

/**
 * Set the html source
 *
 * @param {string} value
 * @return {ThunkAction} tuhnk
 */
export function setHtmlSource(value: String): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_HTML_SOURCE,
      value,
    });
    autoRun(dispatch);
  };
}

/**
 * Set the js code
 *
 * @param {string} value
 * @return {ThunkAction} tuhnk
 */
export function setJs(value: String): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_JS,
      value,
    });
    autoRun(dispatch);
  };
}

/**
 * Parse the code and dispatch setHtmlOutput action
 *
 * @return {ThunkAction} tunk to be executed
 */
export function run(): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState) {
    let { code, logs } = getState();
    let preserveLogs = logs && logs.preserveLogs;

    if (!preserveLogs) {
      dispatch(clearLogs());
    }

    // Parse the code
    let { error, html, logs: resultLogs } = await Parser.parse(code);

    if (error) {
      return dispatch(addLog(error));
    }

    dispatch(setHtmlOutput(html));

    resultLogs.forEach(log => dispatch(addLog(log)));
  };
}
