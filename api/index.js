import bootstrap from './bootstrap';
import { connect } from './config/db';

export Snippet from './snippet';
export User from './user';

export default (app) => {
  connect(); // connect to database
  bootstrap(app); // bootstrap controllers
};
