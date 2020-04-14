const path = require('path');
const fs = require('fs');

const express = require('express');
const bcrypt = require("bcrypt");
const axios = require("axios");
const {nanoid} = require("nanoid");

const config = require('../config');
const User = require('../models/User');
const auth = require('../middleware/auth');

const upload = require('../multer').avatar;

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  if (req.file) {
    user.avatar = req.file.filename;
  }

  try {
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/subscriptions', [auth], async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send({message: 'Field "username" must be filled'});
  }
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    return res.status(400).send({message: 'Such user with this username doesnt exist'});
  }
  try {
    await User.updateOne({_id: req.user._id}, {
      $push: {
        subscriptions: user._id,
      }
    }, {runValidators: true});
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/subscriptions', [auth], async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send({message: 'Field "username" must be filled'});
  }
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    return res.status(400).send({message: 'Such user with this username doesnt exist'});
  }
  try {
    await User.updateOne({_id: req.user._id}, {
      $pull: {
        subscriptions: user._id,
      }
    }, {runValidators: true});
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  user.generateToken();

  await user.save();

  return res.send(user);
});

router.patch('/profile', [auth, upload.single('avatar')], async (req, res) => {
  try {
    if (req.file) {
      if (req.user.avatar) {
        await fs.promises.unlink(path.join(config.uploadPath, req.user.avatar));
      }

      req.user.avatar = req.file.filename;
    }

    if (req.body.displayName) {
      req.user.displayName = req.body.displayName;
    }

    await req.user.save();

    return res.send(req.user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try {
    const token = req.get('Authorization').split(' ')[1];

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (e) {
    return res.send(success);
  }
});

router.post('/facebook', async (req, res) => {
  try {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(url);

    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({message: 'User ID incorrect'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      user = new User({
        username: req.body.id,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.displayName,
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    return res.sendStatus(401);
  }
});

module.exports = router;