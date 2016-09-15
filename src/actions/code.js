import * as Parser from '../parsers/client';
import { addLog } from './logs';

export const SET_JS = 'SET_JS';
export const SET_HTML_SOURCE = 'SET_HTML_SOURCE';
export const SET_HTML_OUTPUT = 'SET_HTML_OUTPUT';
export const SET_AUTO_RUN = 'SET_AUTO_RUN';

export const setHtmlSource = (value) => ({
  type: SET_HTML_SOURCE,
  value,
});

export const setAutoRun = (value) => ({
  type: SET_AUTO_RUN,
  value,
});

export const setHtmlOutput = (value) => ({
  type: SET_HTML_OUTPUT,
  value,
});

export const setJs = (value) => ({
  type: SET_JS,
  value,
});

export const run = () =>
  (dispatch, getState) => {
    let { js, htmlSource } = getState().code;

    // Parse the code with a web worker
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
