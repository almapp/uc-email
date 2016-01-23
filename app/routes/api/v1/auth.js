const express = require('express');

const OAuth2Client = require('../../../lib/auth');
const config = require('../../../config');

const client = new OAuth2Client(config.get('gmail'));
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect(client.url);
});

router.get('/callback', (req, res, next) => {
  const code = req.query.code
  if (!code) return next(new Error('no code'));

  client.getToken(code)
    .then(success => res.send(success))
    .catch(next);
});

module.exports = router;
