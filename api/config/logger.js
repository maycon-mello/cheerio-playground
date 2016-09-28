import winston from 'winston';
import config from './envConfig';

class Logger {
  static log(text) {
    if (config.log === false) {
      return;
    }

    winston.info(text);
  }

  static err(text) {
    winston.info(text);
  }
}

export default Logger;
