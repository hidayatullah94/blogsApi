require("dotenv").config();
const { routes } = require("./routes");

const Hapi = require("@hapi/hapi");
// const blogs = require("./api/blogs");
// const BlogService = require("./service/ServiceBlog");
const init = async () => {
  // const blogservice = new BlogService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,

    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  // await server.register({
  //   plugin: blogs,
  //   options: {
  //     service: blogservice,
  //   },
  // });
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
