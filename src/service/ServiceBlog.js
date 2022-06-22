const { v1: uuidv1 } = require("uuid");
const { Pool } = require("pg");

class BlogService {
  constructor() {
    this._pool = new Pool();
  }

  //addBlog
  async addBlog({ title, category, content }) {
    const id = uuidv1(16);
    const created = new Date().toISOString();
    const updated = created;

    console.log("dataService", title, category, content);

    const query = {
      text: `INSERT INTO blogs VALUES ($1, $2, $3, $4, $5,$6) RETURNING id`,
      values: [id, title, category, content, created, updated],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error(`Blog gagal ditambahkan`);
    }

    return result.rows[0].id;
  }

  //get blog
  async getBlog() {
    const result = await this._pool.query(`SELECT * FROM blogs`);
    return result.rows;
  }

  //get by id
  async getBlogById(id) {
    const query = {
      text: ` SELECT * FROM blogs WHERE id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error("Blog tidak ditemukan");
    }

    return result.rows[0];
  }

  //edit blog
  async putBlog(id, { title, category, content }) {
    const updated = new Date().toISOString();
    const query = {
      text: `UPDATE blogs SET title= $1, category=$2, content=$3, updated=$4 WHERE id=$5 RETURNING id `,
      values: [title, category, content, updated, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error("Blog tidak ditemukan");
    }
  }

  //delete blog

  async deleteBlog(id) {
    const query = {
      text: `DELETE FROM blogs WHERE id= $1 RETURNING id`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error("Blog tidak ditemukan");
    }
  }
}

module.exports = BlogService;
