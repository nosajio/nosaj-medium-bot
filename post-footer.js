const postFooter = `<hr>
<p>
  <em>This was originally posted on my blog, where I write about the craft of making software and other things that I think people will find valuable. </em>
  <a href="https://nosaj.io" target="_blank"><em>https://nosaj.io.</em></a>
  <em> Go and check it out!</em>
</p>`;

const appendPostFooter = str => `${str}\n\n${postFooter}`;

module.exports = appendPostFooter
