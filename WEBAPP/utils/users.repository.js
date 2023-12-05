pool = require("../utils/db.js");

module.exports = {
  async getOneUser(username) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT user_id,user_name,user_email,user_role FROM users WHERE user_name = ? "; 
      // must leave out the password+hash
      const [rows, fields] = await conn.execute(sql, [ username ]);
      conn.release();

      console.log("rows.length",rows.length);
      console.log(rows[0]);
      if (rows.length != 0) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  
  async areValidCredentials(username, password) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM USERS WHERE user_name = ? "; 
      // TODO: better salt+pw hash - COLLATE usually not needed
      const [rows, fields] = await conn.execute(sql, [username]);
      conn.release();

      console.log(sql);
      console.log(username);
      console.log(password);
      console.log(rows);
      if (rows != null) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}; 