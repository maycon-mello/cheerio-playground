import { expect } from 'chai';
import { spy } from 'sinon';
import * as actions from '../actions/code';
import code, { DEFAULT_STATE } from './code';

describe('Reducers', () => {
  describe('Code', () => {
    it('should handle initial state', () => {
      let state = code(undefined, {});
      expect(state).to.deep.equal(DEFAULT_STATE);
    });

    it('should handle SET_JS', (done) => {
      let value = 'const b = 2'
      let fn = actions.setJs(value);

      const dispatch = (action) => {
        let state = code(undefined, action);
        expect(state.js).to.equal(value);
        done();
      }
      fn(dispatch);
    });

    it('should handle SET_AUTO_RUN', () => {
      let value = true;
      let state = code(undefined, actions.setAutoRun(value));
      expect(state.autoRun).to.equal(value);
    });

    it('should handle SET_HTML_SOURCE', (done) => {
      let value = '<div>Test</div>'
      let fn = actions.setHtmlSource(value);
      const dispatch = (action) => {
        let state = code(undefined, action);
        expect(state.htmlSource).to.equal(value);
        done();
      }
      fn(dispatch);
    });

    it('should handle SET_HTML_OUTPUT', () => {
      let value = '<div>Test</div>'
      let state = code(undefined, actions.setHtmlOutput(value));
      expect(state.htmlOutput).to.equal(value);
    });
  });
});
