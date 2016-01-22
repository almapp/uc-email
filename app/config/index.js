const nconf = require('nconf');

const settings = {
  'PRODUCTION': 'app/config/env/production.json',
  'DEVELOPMENT': 'app/config/env/development.json',
  'TEST': 'app/config/env/test.json',
  'CI': 'app/config/env/ci.json', // To use with Travis-CI
}

const env = process.env.NODE_ENV || 'DEVELOPMENT';
const file = settings[env.toUpperCase()];

module.exports = nconf.env('__').argv().file(file).defaults({
  'port': 3000,
  'gmail': {
    'client_id': '',
    'secret': '',
    'redirect_uri': '',
    'scopes': [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
    ],
  },
});
