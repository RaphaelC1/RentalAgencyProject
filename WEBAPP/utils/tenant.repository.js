// utils/cars.repository.js
pool = require("./db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    async getAllApartments() { // TODO? move to brands.repository.js
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM brands";
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
    async getOneApartment(carId) {
        try {
            let conn = await pool.getConnection();
            // sql = "SELECT * FROM cars INNER JOIN brands ON car_brand=brand_id WHERE car_id = "+carId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM cars INNER JOIN brands ON car_brand=brand_id WHERE car_id = ?";
            const [rows, fields] = await conn.execute(sql, [carId]);
            conn.release();
            console.log("CARS FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async delOneCar(carId) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM cars WHERE car_id = ?";
            const [okPacket, fields] = await conn.execute(sql, [carId]);  // affectedRows, insertId
            conn.release();
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneTenant(tenantData) {
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Tenants (FirstName, LastName, Email, PhoneNumber) VALUES (?, ?, ?, ?)";
            const [okPacket, fields] = await conn.execute(sql, [
                tenantData.FirstName,
                tenantData.LastName,
                tenantData.Email,
                tenantData.PhoneNumber
            ]);
            conn.release();
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneCar(carId, carBrand, carName, carBaseprice, carIsfancy, carRealprice) {
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE cars SET car_brand=?, car_name=?, car_baseprice=?, car_isfancy=?, car_realprice=? WHERE car_id=? "; // TODO: named parameters? :something
            const [okPacket, fields] = await conn.execute(sql,
                [carBrand, carName, carBaseprice, carIsfancy, carRealprice, carId]);
            conn.release();
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
