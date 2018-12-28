const API_DELAY = 50;

let comments = {
  list: [
    {
      id: 0,
      author: "USER1",
      content:
        "Nunc eu erat non metus semper tristique. Nullam eleifend eros eget malesuada tempor. Suspendisse potenti. In scelerisque malesuada porta.",
      upvotes: 0,
      liked: false
    },
    {
      id: 1,
      author: "USER2",
      content:
        "Nunc pretium mollis velit non aliquet. Etiam sapien augue, molestie a purus vitae, viverra mattis odio.",
      upvotes: 3,
      liked: true
    }
  ]
};
export const getComments = (provId, cityId) =>
  new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve(comments);
    }, API_DELAY)
  );

export const addComment = (provId, cityId, comment) => {
  const nextId =
    comments.list.reduce((prev, curr) => (prev.id > curr.id ? prev : curr)).id +
    1;
  comments.list = comments.list.concat({
    ...comment,
    id: nextId,
    author: "user",
    upvotes: 0,
    liked: false
  });
  console.log(comments);
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve(comments);
    }, API_DELAY)
  );
};

export const toggleCommentUpvote = (commentId, liked) => {
  comments.list = comments.list.map(c =>
    c.id !== commentId
      ? c
      : { ...c, liked, upvotes: c.upvotes + (liked ? 1 : -1) }
  );
  return new Promise((resolve, reject) =>
    setTimeout(function() {
      resolve(comments);
    }, API_DELAY)
  );
};
