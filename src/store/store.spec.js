import { expect } from 'chai';
import { spy } from 'sinon';

import configureStore from './configureStore';

// Actions
import * as code from '../actions/code';
import * as logs from '../actions/logs';

describe('Store', () => {
  describe('Code', () => {

    it('should have logs and code state', () => {
      const store = configureStore();
      const { code, logs } = store.getState();

      expect(code).to.be.ok;
      expect(logs).to.be.ok;
    });

    it('should parse the html code without errors', () => {
      const store = configureStore();
      const htmlSource = "<div>Test</div>";
      const js = "$('div').addClass('test');";
      const htmlOutput = `<div class="test">Test</div>`;

      store.dispatch(code.setJs(js));
      store.dispatch(code.setHtmlSource(htmlSource));
      store.dispatch(code.run());

      const state = store.getState();

      expect(state.code.htmlOutput).equals(htmlOutput);
      expect(state.logs.logs.length).equals(0);
    });

    it('should parse with errors', () => {
      const store = configureStore();
      const htmlSource = "<div>Test</div>";
      const js = "$.find('div').addClass('test');";

      store.dispatch(code.setJs(js));
      store.dispatch(code.setHtmlSource(htmlSource));
      store.dispatch(code.run());

      const state = store.getState();

      expect(state.logs.logs.length).equals(1);

    });

  });
});
