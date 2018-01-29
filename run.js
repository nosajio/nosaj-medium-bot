require('dotenv').config();

const debug = require('debug')('mediumbot:init');
const error = require('debug')('mediumbot:error:init');

const { postsBefore }                       = require('./time');
const { getPublishedPosts, getMediumPosts } = require('./api-client');
const diffPosts                             = require('./diff-posts');
const { publishOneToMedium }                = require('./publish-to-medium');

const today = new Date();

//  Get posts from api.nosaj.io and medium, compare them, then upload
//  any new posts on nosaj.io to Medium.
Promise.all([getPublishedPosts(), getMediumPosts()])
  
  // Only return posts not already on medium.com
  .then(diffPosts)
  .catch(err => Promise.reject(err))
  
  // Filter posts so that only posts from earlier than today are published.
  // This gives some buffer time for editing etc.
  .then(postsBefore(today))
  .catch(err => Promise.reject(err))
  
  // Publish the top post to Medium
  .then(publishOneToMedium)
  .catch(err => Promise.reject(err))
  
  // Output the success massage and exit
  .then(({ title, url }) => {
    debug('%s was published to medium @ %s', title, url);
    process.exit();
  })
  
  // Error catch all
  .catch(err => error(err));
