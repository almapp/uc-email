const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/email', require('./email'));

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'PRODUCTION') {
    delete err.stack;
  }
  res.status(err.statusCode || 500).json(err);
});

module.exports = router;
