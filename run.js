require('dotenv').config();

const postContent = `<h2 data-nosaj-post-slug="carrots" id="how-does-a-pro-live-">How does a pro live?</h2>
<p>In posing this question, the stereotype of a pro athlete comes to mind.</p>
<p>We all know the stereotype of the pro athlete. The pro athlete gets up at 4:30am, cracks four raw eggs into a glass, downs them, trains all day, protein shake, high fives, then repeats tomorrow.</p>
<p>The jockish image of the pro is an obvious over generalisation, but its the first thing that enters the minds of most people. In reality there are pros in every discipline because being pro is a mindset.</p>
<p>Indeed there are pros all around us. Pro business people, creatives, athletes, scientists, fishermen, writers. Name any field, there will be people who care enough about it to focus <em>everything</em> on it. Sometimes to a fault.</p>
<h2 id="show-up-every-day">Show up every day</h2>
<blockquote>
<p>Don’t expect to be motivated every day to get out there and make things happen. You won’t be. Don’t count on motivation. Count on Discipline.</p>
<p>– <a title="null" href="https://www.amazon.com/Discipline-Equals-Freedom-Field-Manual/dp/1250156947" target="_blank">Jocko Willink, Discipline Equals Freedom: Field Manual</a></p>
</blockquote>
<p>If we could extract the essence of the pro it would look something like extreme focus. </p>
<p>In the War of Art, Steven Pressfield&#39;s solution to creative block is as simple as showing up every day. The premise of the book is that, by exercising discipline over yourself every day, you will eventually tune your brain to perform well at that task every day. </p>
<p>This isn&#39;t that surprising when you think about it. Your brain is already structured to favour predictability. As an experiment, think about something you do at the same time every day (checking email is a good one). Then try delaying it. Do something else instead... checking your email will be all you can think about.</p>
<p>This is the reason Steven King writes in the morning over coffee, as he always has. </p>
<h2 id="-systems-goals-http-bigthink-com-videos-adam-alter-want-to-succeed-dont-set-goals-set-systems-"><a title="null" href="http://bigthink.com/videos/adam-alter-want-to-succeed-dont-set-goals-set-systems" target="_blank">Systems &gt; Goals</a></h2>
`;

const debug = require('debug')('mediumbot:init');
const error = require('debug')('mediumbot:error:init');

const { getPublishedPosts, getMediumPosts } = require('./api-client');
const diffPosts = require('./diff-posts');
const { publishOneToMedium } = require('./publish-to-medium');

//  Get posts from api.nosaj.io and medium, compare them, then upload
//  any new posts on nosaj.io to Medium.
Promise.all([getPublishedPosts(), getMediumPosts()])
  .then(diffPosts)
  .catch(err => { error(err) })
  .then(publishOneToMedium)
  .catch(err => { error(err) })
  .then(({ title, url }) => {
    debug('%s was published to medium @ %s', title, url);
    process.exit();
  });
