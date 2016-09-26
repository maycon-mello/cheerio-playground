import { expect } from 'chai';
import * as actions from './code';
import * as logActions from './logs';

describe('Actions', () => {
  describe('Code', () => {
    it('setHtmlSource should create SET_HTML_SOURCE action', (done) => {
      const value = '<div>Test</div>';
      const fn = actions.setHtmlSource(value);
      const dispatch = (action) => {
        expect(action).to.deep.equal({
          type: actions.SET_HTML_SOURCE,
          value,
        });
        done();
      };
      fn(dispatch, () => {});
    });

    it('setAutoRun should create SET_AUTO_RUN action', () => {
      const value = true;
      const action = actions.setAutoRun(value);
      expect(action).to.deep.equal({
        type: actions.SET_AUTO_RUN,
        value,
      });
    });

    it('setHtmlOutput should create SET_HTML_OUTPUT action', () => {
      const value = '<div>Test</div>';
      const action = actions.setHtmlOutput(value);
      expect(action).to.deep.equal({
        type: actions.SET_HTML_OUTPUT,
        value,
      });
    });

    it('setJs should create SET_JS action', (done) => {
      const value = 'const b = 2';
      const fn = actions.setJs(value);
      const dispatch = (action) => {
        expect(action).to.deep.equal({
          type: actions.SET_JS,
          value,
        });
        done();
      };
      fn(dispatch, () => {});
    });

    it('run should create SET_HTML_OUTPUT action', (done) => {
      const js = '$("div").addClass("test");';
      const htmlSource = '<div>test</div>';

      const fn = actions.run();
      expect(fn).to.be.a('function');

      const dispatch = ({ type, value }) => {
        if (type !== actions.SET_HTML_OUTPUT) {
          return;
        }
        expect(type).to.equal(actions.SET_HTML_OUTPUT);
        expect(value).to.be.ok;
        done();
      };

      const getState = () => ({ code: { js, htmlSource } });

      fn(dispatch, getState);
    });

    it('running with error should create ADD_LOG action', (done) => {
      // Bad syntax js
      const js = '$.find("div").addClass("test");';

      const htmlSource = '';

      const fn = actions.run();
      expect(fn).to.be.a('function');

      const dispatch = ({ type, value }) => {
        if (type !== logActions.ADD_LOG) {
          return;
        }
        expect(type).to.equal(logActions.ADD_LOG);
        expect(value).to.be.ok;
        done();
      };

      const getState = () => ({ code: { js, htmlSource } });

      fn(dispatch, getState);
    });
  });
});
