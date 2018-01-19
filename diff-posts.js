const debug = require('debug')('mediumbot:diffPosts');
const error = require('debug')('mediumbot:error:diffPosts');
const { canonicalUrl } = require('./api-client');
const blacklist = require('./blacklist');

module.exports = diffPosts;

/**
 *  Compare posts from nosaj.io and medium. Return the website posts that
 *  are not present on Medium. Currently this relies on the canonicalUrl
 *  being set properly on the medium posts.
 *  @param {array} website
 *  @param {array} medium
 */
function diffPosts([website, medium]) {
  //  Add blacklisted posts to medium array
  blacklist.forEach(url => medium.push({ canonicalUrl: url }) );
  
  //  Diff posts, returning only the posts that are not already on Medium.
  //  Will return an empty array if nothing is available.
  const notOnMedium = website.filter(p => {
    const postUrl = canonicalUrl(p);
    const mediumVersion = medium.find(m => m.canonicalUrl === postUrl);
    if (! mediumVersion) {
      return true;
    }
  });
  return notOnMedium
}
