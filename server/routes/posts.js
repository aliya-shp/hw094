const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const upload = require('../multer').uploads;

const Post = require('../models/Post');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find();

  res.send(posts);
});

router.get('/tags', async (req, res) => {
  const tags = await Post.distinct('tags');

  return res.send(tags);
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(post);
  } catch (error) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
  if (!req.body.text || !req.file) {
    return res.status(404).send({message: 'Text or image must be entered'});
  }

  try {
    const postData = {
      author: req.user,
      text: req.body.text,
      tags: JSON.parse(req.body.tags),
      timestamp: new Date().toISOString(),
    };

    if (req.file) {
      postData.image = req.file.filename;
    }

    const post = new Post(postData);

    await post.save();

    return res.send(post);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.patch('/:id', [auth, upload.single('image')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({message: 'Not found'});
    }

    if (req.file) {
      if (req.user.image) {
        await fs.promises.unlink(path.join(config.uploadPath, req.user.image));
      }

      req.user.image = req.file.filename;
    }

    if (req.body.text) {
      req.user.text = req.body.text;
    }

    await req.user.save();

    return res.send(req.user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

module.exports = router;