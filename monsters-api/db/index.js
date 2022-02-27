const {Pool} = require('pg');
const {user, host, database, password, port} = require('../secrets/db_configuration');

const pool = new Pool({ user, host, database, password, port });

pool.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connected");
});

module.exports = pool;
