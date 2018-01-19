/**
 *  I had already published three posts to Medium before making this bot, and
 *  as it isn't currently possible to add a canonical URL to medium posts 
 *  unless they're created using the API. 
 *
 *  Hopefully this will change in the future – or I'll come up with a better
 *  solution. But until then, the array in this file will be used to extend
 *  the medium posts list.
 */
 
const postsBlacklist = [
  'https://nosaj.io/r/replace-patreon',
  'https://nosaj.io/r/how-to-run',
  'https://nosaj.io/r/ripcast-writeup',
  
  // The ones below I just don't want to cross-post
  'https://nosaj.io/r/giving-podcasts-a-makeover',
  'https://nosaj.io/r/making-a-holiday-website',
  'https://nosaj.io/r/the-bane-of-notifications',
  'https://nosaj.io/r/the-fragility-of-education',
  'https://nosaj.io/r/recreational-outrage-is-toxic',
];
 
module.exports = postsBlacklist;
