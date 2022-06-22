const ClientError = require("../../error/ClientError");

class BlogHandler {
  constructor(service) {
    this._service = service;

    this.postBlogHandler = this.postBlogHandler.bind(this);
    this.getBlogHandler = this.getBlogHandler.bind(this);
    this.getBlogByIdHandler = this.getBlogByIdHandler.bind(this);
    this.putBlogHandler = this.putBlogHandler.bind(this);
    this.deleteBlogHandler = this.deleteBlogHandler.bind(this);
  }

  // add handler
  async postBlogHandler(req, h) {
    try {
      const { title, category, content } = req.payload;
      console.log("datahandler", req.payload);

      const blogId = await this._service.addBlog({ title, category, content });

      const response = h.response({
        status: "success",
        message: "Berhasil menambahkan Blog",
        data: {
          blogId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // server error
      const response = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan server",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  //get all
  async getBlogHandler() {
    const blogs = await this._service.getBlog();

    return {
      status: "success",
      data: {
        blogs,
      },
    };
  }

  //get blog by Id
  async getBlogByIdHandler(req, h) {
    try {
      const { id } = req.params;

      const blogs = await this._service.getBlogById(id);

      const response = h.response({
        status: "success",
        data: {
          blogs,
        },
      });
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Blog tidak ditemukan ",
      });
      response.code(404);
      return response;
    }
  }

  //edit blog
  async putBlogHandler(req, h) {
    try {
      const { id } = req.params;

      const blogs = await this._service.putBlog(id, req.payload);

      return {
        status: "success",
        message: "Blog berhasil diperbarui",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Blog tidak ditemukan ",
      });
      response.code(404);
      return response;
    }
  }

  //delete blog

  async deleteBlogHandler(req, h) {
    try {
      const { id } = req.params;

      const blogs = await this._service.deleteBlog(id);

      return {
        status: "success",
        message: "Blog berhasil dihapus",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Blog tidak ditemukan ",
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = BlogHandler;
