import Express from 'express';
import Snippet from './model';

const router = Express.Router();

router.post('/', async (req, res) => {
  let { value } = req.body;
  let snippet;

  try {
    snippet = await Snippet.create({ value });
  } catch (error) {
    return res.status(500).json({ error });
  }

  return res.status(201).json({ snippet });
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  let snippet = await Snippet.getById(id);
  return res.status(200).json({ snippet });
});

router.get('/', async (req, res) => {
  let result = await Snippet.getList({});
  let list = result.items;

  return res.status(200).json({ list });
});

export default app => app.use('/api/snippets', router);
