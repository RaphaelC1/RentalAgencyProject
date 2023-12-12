pool = require("../utils/db.js");

module.exports = {


  async getAllUsers() {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.execute('SELECT * FROM Users');
      connection.release();
      return rows;
    } catch (err) {
      throw err;
    }
  },
  
  async getOneUser(user_id) {
    try {
        let conn = await pool.getConnection();
        let sql = "SELECT user_id,user_name,user_email,user_role FROM users WHERE user_name = ? ";
        const [rows, fields] = await conn.execute(sql, [user_id !== undefined ? user_id : null]);
        conn.release();

        console.log("rows.length", rows.length);
        console.log(rows[0]);

        if (rows.length !== 0) {
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
  },

  async delOneUser(id) {
    try {
        let conn = await pool.getConnection();
        console.log(id);
        let sql = "DELETE FROM Users WHERE id = ?";
        const [okPacket, fields] = await conn.execute(sql, [id]);
        conn.release();
        console.log("DELETE " + JSON.stringify(okPacket));

    } catch (err) {
        console.log(err);
        throw err;
    }
},

async addOneUser(UserData) {
  try {
      let conn = await pool.getConnection();
      let sql = "INSERT INTO Users (user_name, user_email, user_role, user_pass) VALUES (?, ?, ?, ?)";
      
      // Replace undefined values with null in the parameter array
      const params = [
          UserData.user_name !== undefined ? UserData.user_name : null,
          UserData.user_email !== undefined ? UserData.user_email : null,
          UserData.user_role !== undefined ? UserData.user_role : null,
          UserData.user_pass !== undefined ? UserData.user_pass : null
      ];

      const [okPacket, fields] = await conn.execute(sql, params);
      conn.release();

      console.log("INSERT " + JSON.stringify(okPacket));
      return okPacket.insertId;
  } catch (err) {
      console.log(err);
      throw err;
  }
},

async editOneUser(UserData, UserId) {
    try {
        let conn = await pool.getConnection();
        // Construct the SQL query with named placeholders for UserData
        const placeholders = Object.keys(UserData).map(key => `${key} = ?`).join(', ');
        const sql = `UPDATE Users SET ${placeholders} WHERE id = ?`;

        // Replace undefined values with null in UserData
        const sanitizedUserData = Object.values(UserData).map(value => value !== undefined ? value : null);

        // Combine values from sanitized UserData and UserId
        const values = [...sanitizedUserData, UserId];

        // Execute the query
        const result = await conn.execute(sql, values);

        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
}; 