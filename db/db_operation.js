// dependencies
const get_client = require("./get_client");

// module scaffolding
const db_operation = {};

// insert data
db_operation.insert = async (table, data) => {
  try {
    const client = await get_client();
    const { rows } = await client.query(
      `INSERT INTO ${table} (username, name, password) VALUES($1, $2, $3) RETURNING *`,
      [data.username, data.name, data.password]
    );
    return rows;
  } catch (err) {
    return err;
  }
};

// get all data
db_operation.get_all = async (table) => {
  const client = await get_client();
  try {
    const { rows } = await client.query(`SELECT * FROM ${table}`);
    return rows;
  } catch (err) {
    return err;
  }
};

// get single data
db_operation.get_single = async (table, username) => {
  const client = await get_client();
  try {
    const { rows } = await client.query(
      `SELECT * FROM ${table} WHERE username=$1`,
      [username]
    );
    return rows;
  } catch (err) {
    return err;
  }
};

// update data
db_operation.update = async (table, id, data) => {
  const client = await get_client();
  try {
    const { rows } = await client.query(
      `UPDATE ${table} SET data=$1 WHERE id=$2 RETURNING *`,
      [data, id]
    );
    return rows;
  } catch (err) {
    return err;
  }
};

// delete data
db_operation.delete = async (table, id) => {
  const client = await get_client();
  try {
    const { rows } = await client.query(`DELETE FROM ${table} WHERE id=$1`, [
      id,
    ]);
    return rows;
  } catch (err) {
    return err;
  }
};

// export module
module.exports = db_operation;
