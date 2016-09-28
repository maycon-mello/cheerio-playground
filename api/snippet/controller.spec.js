import { expect } from 'chai';
import Snippet from './model';

describe('Snippets route', () => {
  it('Get list', async () => {
    let res = await Request.get('/api/snippets').expect(200);

    expect(res.body.list).to.be.an('array');
  });

  // it('Get snippet by id', async () => {
  //   let params = { content: 'test' };
  //   let snippet = await Snippet.create(params);
  //   let res = await Request.get(`/api/snippets/${snippet.id}`).expect(200);
  //
  //   expect(res.body.snippet.id).to.be.equal(snippet.id);
  // });
  //
  // it('expect to create a new snippet', async () => {
  //   let params = { content: 'test' };
  //   let res = await Request.post('/api/snippets').send(params).expect(201);
  //   let { snippet } = res.body;
  //
  //   expect(snippet.id).to.be.ok;
  //   expect(snippet.value).to.be.equal(params.value);
  // });
});
