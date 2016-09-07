export const SET_JS = 'SET_JS';
export const SET_HTML_SOURCE = 'SET_HTML_SOURCE';
export const SET_HTML_OUTPUT = 'SET_HTML_OUTPUT';

export const setHtmlSource = (value) => ({
  type: SET_HTML_SOURCE,
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
