import request from 'supertest';

import app from '../../server.dev';

let token = ' ';


/**
 * Apply default headers
 *
 */
function applyHeaders(request) {
  return request.set('authorization', token);
}

/**
 * Create a SuperTest request
 *
 */
function createRequest() {
  return request(app);
}

export const setToken = (t) => token = t;

/**
 * Request to api with required headers
 *
 */
export const Request = {
  get(resource) {
    return applyHeaders(createRequest().get(resource));
  },

  post(resource) {
    return applyHeaders(createRequest().post(resource));
  },

  put(resource) {
    return applyHeaders(createRequest().put(resource));
  },

  delete(resource) {
    return applyHeaders(createRequest().delete(resource));
  },
};
