import mongoose from 'mongoose';
import config from './envConfig';
import Logger from './logger';

mongoose.Promise = global.Promise;

export const connect =  () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.db.uri);
    mongoose.connection.once('open', () => {
      Logger.log(`Successfull connected to ${config.db.uri}`);
      resolve();
    });
    mongoose.connection.on('error', (err) => {
      console.log(err);
      reject(err);
    });
  });
};
