import { expect } from 'chai';
import uuid from 'uuid';
import Snippet from './model';

describe('Snippets model', () => {
  // it('expect get a snippet list', async () => {
  //   let params = { content: 'test' };
  //
  //   // create a snippet
  //   await Snippet.create(params);
  //   let snippets = await Snippet.getList({});
  //   expect(snippets.length >= 0).to.be.ok;
  // });

  it('Creating new snippet', async () => {
    let params = {
      content: {
        html: 'html',
        js: 'js',
      },
      title: 'test',
    };

    let result = await Snippet.create(params);
    expect(result._id).to.be.ok;
  });

  // it('expect get a snippet list with filter', async () => {
  //   let id = uuid();
  //
  //   for (let i = 0; i < 10; i++) {
  //     await Snippet.create({
  //       content: id + `-${i}`,
  //     });
  //   }
  //
  //   let snippets = await Snippet.getList({
  //     value: id,
  //     orderBy: 'value',
  //     limit: 5,
  //     skip: 1,
  //   });
  //
  //   expect(snippets.length).to.equal(5);
  //   expect(snippets[0].value).to.equal(`${id}-1`);
  // });
});
