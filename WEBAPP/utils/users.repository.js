pool = require("./db.js");
const bcrypt = require('bcrypt');

const saltRounds = 10; 

module.exports = {


  async getAllUsers() { 
    try {
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM Users";
        const [rows, fields] = await conn.execute(sql);
        conn.release();
        return rows;
    }
    catch (err) {
        console.log(err);
        throw err; 
    }
},
  
  async getOneUser(user_name) {
    try {
        let conn = await pool.getConnection();
        let sql = "SELECT user_id,user_name,user_email,user_role,user_pass FROM users WHERE user_name = ? ";
        const [rows, fields] = await conn.execute(sql, [user_name !== undefined ? user_name : null]);
        conn.release();

        console.log("rows.length", rows.length);
        console.log(rows[0]);

        if (rows.length !== 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
  },

  async getOneUserById(user_id) {
    try {
        let conn = await pool.getConnection();
        let sql = "SELECT * from Users WHERE user_id = ?";
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
  
  async areValidCredentials(user_name, user_pass) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM USERS WHERE user_name = ? "; 
      // TODO: better salt+pw hash - COLLATE usually not needed
      // Use the promisified bcrypt.compare function
      const [rows, fields] = await conn.execute(sql, [user_name]);
      conn.release();

      console.log(sql);
      console.log(user_name);
      console.log(user_pass);
      console.log(rows);
      return rows != null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async delOneUser(user_id) {
    try {
        let conn = await pool.getConnection();
        let sql = "DELETE FROM Users WHERE user_id = ?";
        const [result] = await conn.execute(sql, [user_id]);
        conn.release();
        console.log("DELETE result: ", result);

        // Return a boolean indicating whether a row was affected (deleted)
        return result.affectedRows > 0;
    } catch (err) {
        console.log(err);
        throw err;
    }
},

async addOneUser(UserData) {
    try {
        let conn = await pool.getConnection();
        let sql = "INSERT INTO Users (user_name, user_email, user_role, user_pass) VALUES (?, ?, ?, ?)";

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(UserData.user_pass, saltRounds);

        // Replace undefined values with null in the parameter array
        const params = [
            UserData.user_name !== undefined ? UserData.user_name : null,
            UserData.user_email !== undefined ? UserData.user_email : null,
            UserData.user_role !== undefined ? UserData.user_role : null,
            hashedPassword // Store the hashed password in the database
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

async editOneUser(UserData, user_id) {
    try {
        let conn = await pool.getConnection();

        // Replace undefined values with null in UserData
        Object.keys(UserData).forEach(key => {
            if (UserData[key] === undefined) {
                UserData[key] = null;
            }
        });

        // Construct the SQL query with named placeholders for UserData
        const placeholders = Object.keys(UserData).map(key => `${key} = ?`).join(', ');
        const sql = `UPDATE Users SET ${placeholders} WHERE user_id = ?`;

        // Combine values from sanitized UserData and UserId
        const values = [...Object.values(UserData), user_id];

        // Execute the query
        const result = await conn.execute(sql, values);

        return result;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
},


    // Function to update user in the database
    async updateUser(userId, userData) {
        try {
            let conn = await pool.getConnection();
    
            // Construct the SQL query to update the user
            const placeholders = Object.keys(userData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(userData);
            values.push(userId); // Append userId for the WHERE clause
    
            const sql = `UPDATE Users SET ${placeholders} WHERE user_id = ?`;
    
            // Execute the update query
            const result = await conn.execute(sql, values);
    
            conn.release(); // Release the connection
    
            return result[0].affectedRows; // Return the number of affected rows
        } catch (error) {
            throw error;
        }
    }
}; 