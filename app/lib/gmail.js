const Gmail = require('node-gmail-api');

const DEFAULT_THREADS_FILTER = ['id', 'snippet', 'historyId', 'messages(id,labelIds,snippet,historyId,internalDate,sizeEstimate)']

module.exports.fetch = function fetch(settings, options) {
  options = options || {};
  options.max = options.max || 10;
  options.fields = options.fields || DEFAULT_THREADS_FILTER;

  const gmail = new Gmail(settings.token);
  const stream = gmail.threads(`label:${settings.label}`, options);
  stream.on('data', data => {
    console.log(JSON.stringify(data, null, 4));
  })
}
