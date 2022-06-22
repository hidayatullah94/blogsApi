const routes = require("./route");
const BlogHandler = require("./handler");

module.exports = {
  name: "blogs",
  version: "1.0.0",
  register: async (server, { service }) => {
    const blogHandler = new BlogHandler(service);

    server.route(routes(blogHandler));
  },
};
