import { expect } from 'chai';
import { spy } from 'sinon';
import * as actions from '../actions/code';
import code, * as Code from './code';

describe('Reducers', () => {
  describe('Code', () => {
    it('should handle initial state', () => {
      let state = code(undefined, {});
      expect(state).to.deep.equal(Code.DEFAULT_STATE);
    });

    it('should handle SET_JS', () => {
      let value = 'const b = 2'
      let state = code(undefined, actions.setJs(value));
      expect(state.js).to.equal(value);
    });

    it('should handle SET_HTML_SOURCE', () => {
      let value = '<div>Test</div>'
      let state = code(undefined, actions.setHtmlSource(value));
      expect(state.htmlSource).to.equal(value);
    });

    it('should handle SET_HTML_OUTPUT', () => {
      let value = '<div>Test</div>'
      let state = code(undefined, actions.setHtmlOutput(value));
      expect(state.htmlOutput).to.equal(value);
    });

  });
});
