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
// Variables from .env file
const { 
  MEDIUM_ACCESS_TOKEN, 
  MEDIUM_USER_ID, 
  MEDIUM_CLIENT_ID, 
  MEDIUM_CLIENT_SECRET 
} = process.env;


const client = new MediumClient({clientId: MEDIUM_CLIENT_ID, clientSecret: MEDIUM_CLIENT_SECRET });

client.setAccessToken(MEDIUM_ACCESS_TOKEN);


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
