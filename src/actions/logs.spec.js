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

    it('logColor should create LOG_COLOR action', () => {
      const color = 'blue';
      const action = actions.setLogColor(color);

      expect(action).to.deep.equal({
        type: actions.LOG_COLOR,
        value: color,
      });
    });

    it('showLogs should create SHOW_LOGS action', () => {
      const action = actions.showLogs(true);

      expect(action).to.deep.equal({
        type: actions.SHOW_LOGS,
        value: true,
      });
    });
  });
});
