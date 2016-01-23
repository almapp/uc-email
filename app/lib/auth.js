'use strict';

const Promise = require('bluebird');
const GoogleAuth = require('google-auth-library');

module.exports = class OAuth2Client {
  constructor(settings) {
    const auth = new GoogleAuth();
    this.client = module.exports = new auth.OAuth2(
      settings.client_id,
      settings.secret,
      settings.redirect_uri
    );
    this.scopes = settings.scopes;
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
