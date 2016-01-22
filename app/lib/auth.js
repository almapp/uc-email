'use strict';

const Promise = require('bluebird');
const GoogleAuth = require('google-auth-library');

const config = require('../config');

module.exports = class OAuth2Client {
  constructor() {
    const auth = new GoogleAuth();
    this.client = module.exports = new auth.OAuth2(
      config.get('gmail:client_id'),
      config.get('gmail:secret'),
      config.get('gmail:redirect_uri')
    );
    this.scopes = config.get('gmail:scopes');
  }

  get url() {
    return this.client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });
  }

  getToken(code) {
    return Promise.fromCallback(cb => this.client.getToken(code, cb));
  }
}
