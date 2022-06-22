/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("blogs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "TEXT",
    },
    category: {
      type: "TEXT",
    },
    content: {
      type: "TEXT",
    },
    created: {
      type: "VARCHAR",
    },
    updated: {
      type: "VARCHAR",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("blogs");
};
