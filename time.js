const postBeforeDate = (postDate, date) => {
  if (! (date instanceof Date) || ! (postDate instanceof Date)) {
    throw new TypeError('Both args should be dates');
  }
  return date < postDate; 
}

const postsBefore = date => posts => 
  posts.map(p =>
    postBeforeDate(
      new Date(p.date),
      date
    )
  );

module.exports = { postsBefore }
