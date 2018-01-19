const debug = require('debug')('mediumbot:publishToMedium');
const error = require('debug')('mediumbot:error:publishToMedium');
const { MediumClient } = require('medium-sdk');
const { canonicalUrl } = require('./api-client');

module.exports = publishToMedium;

const { 
  MEDIUM_ACCESS_TOKEN, 
  MEDIUM_USER_ID, 
  MEDIUM_CLIENT_ID, 
  MEDIUM_CLIENT_SECRET 
} = process.env;

//  This variable is set later, and will be the client returned by calling
//  new MediumClient()
let mediumClient = null;

//  Instantiate a new medium client using the medium SDK.
//  The best docs I've found for the official node SDK is the source code:
//  https://github.com/Medium/medium-sdk-nodejs/blob/master/lib/mediumClient.js
mediumClient = new MediumClient({clientId: MEDIUM_CLIENT_ID, clientSecret: MEDIUM_CLIENT_SECRET });
//  Set the access token here as we already know it
mediumClient.setAccessToken(MEDIUM_ACCESS_TOKEN);

/**
 *  Publish posts to Medium using the Medium SDK
 *  Notice: This is an indiscriminate function; it will publish posts that 
 *          have already been published. This requires logic further up 
 *          the stack to distinguish between new and already published posts.
 *  @param {array} posts - An array of posts, in the same format as api.nosaj.io
 *  @return {array} posts
 */
function publishToMedium(posts) {
  const requests = [];
  return posts.map(p => debug(p.title));
  posts.forEach(post => requests.push( createDraft(post) ))
  Promise.all(requests)
    .then(responses => {
      debug('%s posts published', responses.length());
      process.exit();
    });
}

function createDraft(post) {
  const postData = {
    userId: MEDIUM_USER_ID,
    title: post.title,
    contentFormat: 'markdown',
    content: post.plain,
    canonicalUrl: canonicalUrl(post),
    publishStatus: 'draft',
  }

  return new Promise(resolve => {
    mediumClient.createPost(postData, (err, response) => {
      if (err) {
        return error(err);
      }
      debug(response);
      resolve(response);
    });
  });
}
