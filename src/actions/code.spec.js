import { expect } from 'chai';
import { spy } from 'sinon';
import * as actions from './code';

describe('Actions', () => {
  describe('Code', () => {

    it('setHtmlSource should create SET_HTML_SOURCE action', () => {
      const value = `<div>Test</div>`;
      const action = actions.setHtmlSource(value);
      expect(action).to.deep.equal({
        type: actions.SET_HTML_SOURCE,
        value,
      });
    });

    it('setHtmlOutput should create SET_HTML_OUTPUT action', () => {
      const value = `<div>Test</div>`;
      const action = actions.setHtmlOutput(value);
      expect(action).to.deep.equal({
        type: actions.SET_HTML_OUTPUT,
        value,
      });
    });

    it('setJs should create SET_JS action', () => {
      const value = `const b = 2`;
      const action = actions.setJs(value);
      expect(action).to.deep.equal({
        type: actions.SET_JS,
        value,
      });
    });

  });
});
