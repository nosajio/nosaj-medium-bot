const debug = require('debug')('mediumbot:publishToMedium');
const error = require('debug')('mediumbot:error:publishToMedium');
const { MediumClient } = require('medium-sdk');
const { canonicalUrl } = require('./api-client');
const wrapPost = require('./post-content');

module.exports = { publishToMedium, publishOneToMedium };

const { 
  MEDIUM_ACCESS_TOKEN, 
  MEDIUM_USER_ID, 
  MEDIUM_CLIENT_ID, 
  MEDIUM_CLIENT_SECRET,
  // This is used for only publishing drafts on dev
  MEDIUM_PUBLISH_TYPE
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
 *  @return {array} responses
 */
function publishToMedium(posts) {
  if (! posts.length) {
    return Promise.reject('No posts present');
  }
  const requests = [];
  posts.forEach(post => requests.push( publish(post) ))
  return Promise.all(requests);
}

/**
 *  Only publish one post to medium each time the bot runs.
 *  @param {array} posts
 *  @return {object} response - the post that was published
 */
function publishOneToMedium(posts) {
  if (! posts.length) {
    return Promise.reject('No posts are available to post');
  }
  const post = posts[0];
  return publish(post);
}

function publish(post) {
  if (! post) {
    throw new Error('No post present');
  }
  const postData = {
    userId: MEDIUM_USER_ID,
    title: post.title,
    contentFormat: 'html',
    content: wrapPost(post.title, post.body),
    canonicalUrl: canonicalUrl(post),
    publishStatus: MEDIUM_PUBLISH_TYPE,
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
