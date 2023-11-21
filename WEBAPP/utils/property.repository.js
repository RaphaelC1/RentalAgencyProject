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
