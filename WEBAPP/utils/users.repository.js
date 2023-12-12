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
        const [okPacket, fields] = await conn.execute(sql, [
            UserData.user_name,
            UserData.user_email,
            UserData.user_role,
            UserData.user_pass
        ]);
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
        // Construct the SQL query with named placeholders for animeData
        const placeholders = Object.keys(UserData).map(key => `${key} = ?`).join(', ');
        const sql = `UPDATE Users SET ${placeholders} WHERE id = ?`;


        // Combine values from animeData and animeId
        const values = [...Object.values(UserData), UserId];

        // Execute the query
        const result = await conn.execute(sql, values);


        conn.release();

        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
}; 