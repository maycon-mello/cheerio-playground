import { expect } from 'chai';
import { spy } from 'sinon';
import * as actions from './logs';

describe('Actions', () => {
  describe('Logs', () => {
    it('addLog should create ADD_LOG action', () => {
      const value = `test log`;
      const action = actions.addLog(value);

      expect(action).to.deep.equal({
        type: actions.ADD_LOG,
        value,
      });
    });

    it('clearLogs should create CLEAR_LOGS action', () => {
      const action = actions.clearLogs();

      expect(action).to.deep.equal({
        type: actions.CLEAR_LOGS
      });
    });
  });
});
