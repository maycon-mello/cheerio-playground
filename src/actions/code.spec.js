import { expect } from 'chai';
import { spy } from 'sinon';
import * as actions from './code';
import * as logActions from './logs';

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

    it('run should create SET_HTML_OUTPUT action', () => {
      const js = `
        $('div').addClass('test');
      `;
      const htmlSource = `
        <div>test</div>
      `;
      const htmlOutput = `
        <div class="test">test</div>
      `;

      const fn = actions.run({ js, htmlSource});
      expect(fn).to.be.a('function');

      const dispatch = spy();
      const getState = () => ({ js, htmlSource });

      fn(dispatch, getState);

      expect(dispatch.firstCall.args[0]).to.deep.equal({
        type: actions.SET_HTML_OUTPUT,
        value: htmlOutput,
      });

    });

    it('running with error should create ADD_LOG action', () => {
      // Bad syntax js
      const js = `
        $.find('div').addClass('test');
      `;

      const htmlSource = '';

      const fn = actions.run({ js, htmlSource});
      expect(fn).to.be.a('function');

      const dispatch = spy();
      const getState = () => ({ js, htmlSource });

      fn(dispatch, getState);

      let dispatchAction = dispatch.firstCall.args[0];

      expect(dispatchAction.type).to.equal(logActions.ADD_LOG);
      expect(dispatchAction.value).to.be.ok;

    });
  });
});
