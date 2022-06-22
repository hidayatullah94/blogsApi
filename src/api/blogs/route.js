const routes = (handler) => [
  {
    method: "POST",
    path: "/blogs",
    handler: handler.postBlogHandler,
  },
  {
    method: "GET",
    path: "/blogs",
    handler: handler.getBlogHandler,
  },
  {
    method: "GET",
    path: "/blogs/{id}",
    handler: handler.getBlogByIdHandler,
  },
  {
    method: "PUT",
    path: "/blogs/{id}",
    handler: handler.putBlogHandler,
  },
  {
    method: "DELETE",
    path: "/blogs/{id}",
    handler: handler.deleteBlogHandler,
  },
];

module.exports = routes;
