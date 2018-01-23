require('dotenv').config();

const debug = require('debug')('mediumbot:init');
const error = require('debug')('mediumbot:error:init');

const { getPublishedPosts, getMediumPosts } = require('./api-client');
const diffPosts = require('./diff-posts');
const { publishOneToMedium } = require('./publish-to-medium');

//  Get posts from api.nosaj.io and medium, compare them, then upload
//  any new posts on nosaj.io to Medium.
Promise.all([getPublishedPosts(), getMediumPosts()])
  .then(diffPosts)
  .catch(err => Promise.reject(err))
  .then(publishOneToMedium)
  .catch(err => Promise.reject(err))
  .then(({ title, url }) => {
    debug('%s was published to medium @ %s', title, url);
    process.exit();
  })
  .catch(err => error(err));
