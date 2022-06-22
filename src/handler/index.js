const { Pool } = require("pg");
const { v1: uuidv1 } = require("uuid");

const pool = new Pool();

// add handler
async function postBlogHandler(req, h) {
  try {
    const { title, category, content } = req.payload;

    const id = uuidv1(16);
    const created = new Date().toISOString();
    const updated = created;
    console.log("data", req.payload);

    const query = {
      text: `INSERT INTO blogs VALUES ($1, $2, $3, $4, $5,$6) RETURNING id`,
      values: [id, title, category, content, created, updated],
    };

    console.log("data", query);

    const result = await pool.query(query);

    // if (!result.rows[0].id) {
    //   throw new Error(`Blog gagal ditambahkan`);
    // }

    return result.rows[0].id;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Blog tidak ditemukan ",
    });
    response.code(404);
    return response;
  }
}

//get all
async function getBlogHandler() {
  const result = await pool.query(`SELECT * FROM blogs`);

  return result.rows;
}

//get blog by Id
async function getBlogByIdHandler(req, h) {
  try {
    const { id } = req.params;

    const query = {
      text: ` SELECT * FROM blogs WHERE id = $1`,
      values: [id],
    };
    const result = await pool.query(query);

    return result.rows[0];
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
async function putBlogHandler(req, h) {
  try {
    const { id } = req.params;
    const { title, category, content } = req.payload;
    const updated = new Date().toISOString();

    const query = {
      text: `UPDATE blogs SET title= $1, category=$2, content=$3, updated=$4 WHERE id=$5 RETURNING id `,
      values: [title, category, content, updated, id],
    };
    const result = await pool.query(query);

    // if (!result.rows.length) {
    //   throw new Error("Blog tidak ditemukan");
    // }
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

async function deleteBlogHandler(req, h) {
  try {
    const { id } = req.params;
    const query = {
      text: `DELETE FROM blogs WHERE id= $1 RETURNING id`,
      values: [id],
    };

    const result = await this._pool.query(query);

    // if (!result.rows.length) {
    //   throw new Error("Blog tidak ditemukan");
    // }
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Blog tidak ditemukan ",
    });
    response.code(404);
    return response;
  }
}

module.exports = {
  postBlogHandler,
  getBlogHandler,
  getBlogByIdHandler,
  putBlogHandler,
  deleteBlogHandler,
};
