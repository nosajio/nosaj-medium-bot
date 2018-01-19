const request = require('request');

const Endpoints = {
  medium: { url: '/medium', method: 'GET' },
  posts: { url: '/posts', method: 'GET' },
}

const apiUrl = process.env.NOSAJ_API_URL;

module.exports = { canonicalUrl, getPublishedPosts, getMediumPosts }

async function getPublishedPosts() {
  const data = await api('posts');
  return JSON.parse(data);
}

async function getMediumPosts() {
  const data = await api('medium');
  return JSON.parse(data);
}

function canonicalUrl(post) {
  return `https://nosaj.io/r/${post.slug}`;
}

/**
 * Wrapper for making calls to api.nosaj.io
 * @param {Endpoints} endpoint - A property value from the Endpoints object
 * @return {Promise<array|object, Error>} - resolves with response body
 */
function api(endpoint) {
  if (! (endpoint in Endpoints)) {
    return Promise.reject( new Error(`${endpoint} isn't in Endpoints object`) );
  }
  const ep = Endpoints[endpoint];
  const requestOptions = {
    url: `${apiUrl}${ep.url}`,
    method: ep.method,
  }
  return new Promise((resolve, reject) => {
    request(requestOptions, (err, response, body) => err ? reject(err) : resolve(body));
  });
}
