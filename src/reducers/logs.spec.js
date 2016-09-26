import { expect } from 'chai';
import { spy } from 'sinon';
import * as actions from '../actions/logs';
import logs, * as Logs from './logs';

describe('Reducers', () => {
  describe('Logs', () => {
    it('should handle initial state', () => {
      let state = logs(undefined, {});
      expect(state).to.deep.equal(Logs.DEFAULT_STATE);
    });

    it('should handle ADD_LOG', () => {
      let value = 'test';
      let state = logs(undefined, actions.addLog(value));
      expect(state.logs.length).to.equal(1);
      expect(state.logs[0]).to.equal(value);
    });

    it('should handle CLEAR_LOGS', () => {
      let state = logs(undefined, {});
      expect(state.logs.length).to.equal(0);
    });

    it('should handle SHOW_LOGS', () => {
      let value = true;
      let state = logs(undefined, actions.showLogs(value));
      expect(state.logsVisible).to.equal(value);
    });
  });
});
