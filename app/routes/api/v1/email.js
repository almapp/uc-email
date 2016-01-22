const express = require('express');

const router = express.Router();
const gmail = require('../../../lib/gmail');

router.get('/', (req, res, next) => {
  gmail.fetch({token: req.query.token, label: 'inbox'});
  res.send("ok");
});

module.exports = router;
