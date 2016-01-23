'use strict';

const Promise = require('bluebird');
const Batchelor = require('batchelor');
const querystring = require('querystring');

const DEFAULT_THREADS_FILTER = ['id', 'snippet', 'historyId', 'messages(id,threadId,labelIds,snippet,historyId,internalDate,sizeEstimate))']

module.exports = class Gmail {
  constructor(token) {
    this.token = token;
    this.batch = new Batchelor({
      uri:'https://www.googleapis.com/batch',
      method:'POST',
      auth: {
        bearer: token,
      },
      headers: {
        'Content-Type': 'multipart/mixed'
      },
    });
  }

  request(reqs) {
    this.batch.reset();
    return Promise.fromCallback(cb => this.batch.add(reqs).run(cb));
  }

  profile() {
    const reqs = {
      'method':'GET',
      'path':'/gmail/v1/users/me/profile',
    };

    return this.request(reqs)
      .then(response => response.parts[0].body);
  }

  // https://developers.google.com/gmail/api/v1/reference/users/threads/get
  thread(threads, params) {
    params = params || {};
    params.format = params.format || 'full';
    // params.fields = params.fields || DEFAULT_THREADS_FILTER.join(',');

    const reqs = [].concat(threads).map(thread => {
      return {
        'method':'GET',
        'path':`/gmail/v1/users/me/threads/${thread.id}?${querystring.stringify(params)}`,
      };
    });

    return this.request(reqs)
      .then(response => response.parts.filter(part => part['statusCode'] === '200'))
      .then(parts => parts.map(part => part.body));
  }

  // https://developers.google.com/gmail/api/v1/reference/users/threads/list
  threads(params, q) {
    params = params || {};
    if (q) params.q = querystring.stringify(q, ' ', ':'); //  For example, "from:someuser@example.com rfc822msgid: is:unread"

    const reqs = {
      'method':'GET',
      'path':`/gmail/v1/users/me/threads?${querystring.stringify(params)}`,
    };

    return this.request(reqs)
      .then(response => response.parts[0].body);
  }
}
