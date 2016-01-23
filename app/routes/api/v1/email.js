const express = require('express');

const router = express.Router();
const Gmail = require('../../../lib/gmail');

router.get('/profile', (req, res, next) => {
  const gmail = new Gmail(req.query.token);
  gmail.profile()
    .then(result => res.send(result))
    .catch(next);
});

router.get('/threads', (req, res, next) => {
  const gmail = new Gmail(req.query.token);
  gmail.threads({maxResults: 5}, {label: 'inbox'})
    .then(result => res.send(result))
    .catch(next);
});

router.get('/threads/:id', (req, res, next) => {
  const gmail = new Gmail(req.query.token);
  gmail.thread({ id: req.params.id })
    .then(result => res.send(result))
    .catch(next);
});

module.exports = router;
