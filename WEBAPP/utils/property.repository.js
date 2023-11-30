// utils/cars.repository.js
pool = require("./db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    async getAllProperties() { // TODO? move to brands.repository.js
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Properties";
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
    async getOneProperty(propertyId) {
        try {
            let conn = await pool.getConnection();
            console.log(propertyId);

            // sql = "SELECT * FROM cars INNER JOIN brands ON car_brand=brand_id WHERE car_id = "+carId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM Properties WHERE id = ?";
            const [rows, fields] = await conn.execute(sql, [propertyId]);
            console.log(propertyId);
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
    async delOneProperty(id) {
        try {
            let conn = await pool.getConnection();
            console.log(id);
            let sql = "DELETE FROM Properties WHERE id = ?";
            const [okPacket, fields] = await conn.execute(sql, [id]);
            conn.release();
            console.log("DELETE " + JSON.stringify(okPacket));

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getPropertiesByLandlordId(landlordId) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Properties WHERE id_Landlords = ?";
            const [rows, fields] = await conn.query(sql, [landlordId]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },





    async addOneProperty(propertyData) {
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Properties (Address, City, ZipCode, NumberOfBedrooms, NumberOfBathrooms, Rent, id_Landlords) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const [okPacket, fields] = await conn.execute(sql, [
                propertyData.Address,
                propertyData.City,
                propertyData.ZipCode,
                propertyData.NumberOfBedrooms,
                propertyData.NumberOfBathrooms,
                propertyData.Rent,
                propertyData.id_Landlords
            ]);
            conn.release();
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneProperty(propertyData, propertyId) {
        try {
            let conn = await pool.getConnection();
            // Construct the SQL query with named placeholders for animeData
            const placeholders = Object.keys(propertyData).map(key => `${key} = ?`).join(', ');
            const sql = `UPDATE Properties SET ${placeholders} WHERE id = ?`;


            // Combine values from animeData and animeId
            const values = [...Object.values(propertyData), propertyId];

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
