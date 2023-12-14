// utils/cars.repository.js
pool = require("./db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    async getAllTenants() { // TODO? move to brands.repository.js
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Tenants";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },

    async getApartmentbyCity(name) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM cars INNER JOIN brands ON car_brand=brand_id WHERE upper(name) like upper(?)";
            const [rows, fields] = await conn.execute(sql, [`%${name}%`]);
            conn.release();
            console.log("CARS FETCHED: " + rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneTenant(tenantId) {
        try {
            let conn = await pool.getConnection();
            console.log(tenantId);

            // sql = "SELECT * FROM cars INNER JOIN brands ON car_brand=brand_id WHERE car_id = "+carId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM Tenants WHERE id = ?";
            const [rows, fields] = await conn.execute(sql, [tenantId]);
            console.log(tenantId);
            conn.release();
            console.log(rows);
            if (rows != null) {
                return rows;
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async delOneTenant(id) {
        try {
            let conn = await pool.getConnection();
            console.log(id);
            let sql = "DELETE FROM Tenants WHERE id = ?";
            const [okPacket, fields] = await conn.execute(sql, [id]);
            conn.release();
            console.log("DELETE " + JSON.stringify(okPacket));

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneTenant(tenantData) {
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Tenants (FirstName, LastName, Email, PhoneNumber, user_id) VALUES (?, ?, ?, ?, ?)";
            const [okPacket, fields] = await conn.execute(sql, [
                tenantData.FirstName,
                tenantData.LastName,
                tenantData.Email,
                tenantData.PhoneNumber,
                tenantData.user_id
            ]);
            conn.release();
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneTenant(tenantData, tenantId) {
        try {
            let conn = await pool.getConnection();
            // Construct the SQL query with named placeholders for animeData
            const placeholders = Object.keys(tenantData).map(key => `${key} = ?`).join(', ');
            const sql = `UPDATE Tenants SET ${placeholders} WHERE id = ?`;


            // Combine values from animeData and animeId
            const values = [...Object.values(tenantData), tenantId];

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
