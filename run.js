require('dotenv').config();

const postContent = `# Behold the test post
This is a test of a bot that publishes posts for me. Please ignore.

  > This should be a quote

## Heading two
Blah blah blah

### Heading three
`;

const debug = require('debug')('mediumbot:init');
const error = require('debug')('mediumbot:error:init');
const { MediumClient } = require('medium-sdk');
const { MEDIUM_ACCESS_TOKEN, MEDIUM_USER_ID } = process.env;

const client = new MediumClient();

const postData = {
  userId: MEDIUM_USER_ID,
  title: 'My test post',
  contentFormat: 'markdown',
  content: postContent,
  canonicalUrl: 'https://nosaj.io',
  publishStatus: 'draft',
}

client.createPost(postData, (err, response) => {
  if (err) {
    return error(err);
  }
  debug(response);
});
