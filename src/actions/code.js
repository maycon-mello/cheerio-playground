import * as Parser from '../parsers/client';
import { addLog, clearLogs } from './logs';

export const SET_JS = 'SET_JS';
export const SET_HTML_SOURCE = 'SET_HTML_SOURCE';
export const SET_HTML_OUTPUT = 'SET_HTML_OUTPUT';
export const SET_AUTO_RUN = 'SET_AUTO_RUN';

const AUTO_RUN_DELAY = 150;

let autoRunTimeout;

function autoRun(dispatch) {
  clearTimeout(autoRunTimeout);
  autoRunTimeout = setTimeout(
    () => dispatch(run()),
    AUTO_RUN_DELAY
  );
}

export const setHtmlOutput = (value) => ({
  type: SET_HTML_OUTPUT,
  value,
});

export const setAutoRun = (value) => ({
  type: SET_AUTO_RUN,
  value,
});

export const setHtmlSource = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_HTML_SOURCE,
      value,
    });
    autoRun(dispatch);
  }
}

export const setJs = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_JS,
      value,
    });
    autoRun(dispatch);
  }
}

export const run = () =>
  (dispatch, getState) => {
    let { code, logs } = getState();

    let { js, htmlSource } = code;
    let preserveLogs = logs && logs.preserveLogs;

    if (!preserveLogs) {
      dispatch(clearLogs());
    }

    // Parse the code
    Parser
      .parse({ js, htmlSource })
      .then(({ html, error, logs }) => {

        // If there is an error create the error log
        if (error) {
          return dispatch(addLog(error));
        }

        dispatch(setHtmlOutput(html));
        if (logs) {
          logs.forEach(log => dispatch(addLog(log)));
        }
      });
  };
