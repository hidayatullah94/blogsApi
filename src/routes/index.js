const { postBlogHandler, getBlogHandler, getBlogByIdHandler, putBlogHandler, deleteBlogHandler } = require("../handler");

const routes = [
  {
    method: "POST",
    path: "/blogs",
    handler: postBlogHandler,
  },
  {
    method: "GET",
    path: "/blogs",
    handler: getBlogHandler,
  },
  {
    method: "GET",
    path: "/blogs/{id}",
    handler: getBlogByIdHandler,
  },
  {
    method: "PUT",
    path: "/blogs/{id}",
    handler: putBlogHandler,
  },
  {
    method: "DELETE",
    path: "/blogs/{id}",
    handler: deleteBlogHandler,
  },
];

module.exports = { routes };
