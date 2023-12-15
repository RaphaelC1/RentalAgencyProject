// utils/cars.repository.js
pool = require("./db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    async getAllLandlords() { // TODO? move to brands.repository.js
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Landlords";
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
    async getOneLandlord(landlordId) {
        try {
            let conn = await pool.getConnection();
            console.log(landlordId);

            // sql = "SELECT * FROM cars INNER JOIN brands ON car_brand=brand_id WHERE car_id = "+carId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM Landlords WHERE id = ?";
            const [rows, fields] = await conn.execute(sql, [landlordId]);
            console.log(landlordId);
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
    async delOneLandlord(id) {
        try {
            let conn = await pool.getConnection();
            console.log(id);
            let sql = "DELETE FROM Landlords WHERE id = ?";
            const [okPacket, fields] = await conn.execute(sql, [id]);
            conn.release();
            console.log("DELETE " + JSON.stringify(okPacket));

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneLandlord(landlordData) {
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Landlords (FirstName, LastName, Email, PhoneNumber, user_id) VALUES (?, ?, ?, ?, ?)";
            const [okPacket, fields] = await conn.execute(sql, [
                landlordData.FirstName,
                landlordData.LastName,
                landlordData.Email,
                landlordData.PhoneNumber,
                landlordData.user_id
            ]);
            conn.release();
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneLandlord(landlordData, landlordId) {
        try {
            let conn = await pool.getConnection();
            // Construct the SQL query with named placeholders for animeData
            const placeholders = Object.keys(landlordData).map(key => `${key} = ?`).join(', ');
            const sql = `UPDATE Landlords SET ${placeholders} WHERE id = ?`;


            // Combine values from animeData and animeId
            const values = [...Object.values(landlordData), landlordId];

            // Execute the query
            const result = await conn.execute(sql, values);


            conn.release();

            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneLandlordByUserId(userId) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Landlords WHERE user_id = ?";
            const [rows, fields] = await conn.execute(sql, [userId]);
            conn.release();
            return rows.length > 0 ? rows[0] : null;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
