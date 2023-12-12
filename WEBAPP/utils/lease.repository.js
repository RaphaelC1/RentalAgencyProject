// utils/cars.repository.js
pool = require("./db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    async getAllLeases() { // TODO? move to brands.repository.js
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Leases";
            const [rows, fields] = await conn.execute(sql);
            // Format LeaseStart and LeaseEnd for each row
            for (let i = 0; i < rows.length; i++) {
                rows[i].LeaseStart = await this.formatDate(rows[i].LeaseStart);
                rows[i].LeaseEnd = await this.formatDate(rows[i].LeaseEnd);
            }

            conn.release();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },
    async getOneLease(leaseId) {
        try {
            let conn = await pool.getConnection();
            console.log(leaseId);

            // sql = "SELECT * FROM cars INNER JOIN brands ON car_brand=brand_id WHERE car_id = "+carId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM Leases WHERE id = ?";
            const [rows, fields] = await conn.execute(sql, [leaseId]);
            rows[0].LeaseStart = await this.formatDate(rows[0].LeaseStart);
            rows[0].LeaseEnd = await this.formatDate(rows[0].LeaseEnd);
        
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
    async formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
},
    async delOneLease(id) {
        try {
            let conn = await pool.getConnection();
            console.log(id);
            let sql = "DELETE FROM Leases WHERE id = ?";
            const [okPacket, fields] = await conn.execute(sql, [id]);
            conn.release();
            console.log("DELETE " + JSON.stringify(okPacket));

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneLease(leaseData) {
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Leases (LeaseStart, LeaseEnd, MonthlyRent, SecurityDeposit, id_Properties, id_Tenants) VALUES (?, ?, ?, ?, ?, ?)";
            const [okPacket, fields] = await conn.execute(sql, [
                leaseData.LeaseStart,
                leaseData.LeaseEnd,
                leaseData.MonthlyRent,
                leaseData.SecurityDeposit,
                leaseData.id_Properties,
                leaseData.id_Tenants,
            ]);
            conn.release();
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async editOneLease(leaseData, leaseId) {
        try {
            let conn = await pool.getConnection();
            // Construct the SQL query with named placeholders for animeData
            const placeholders = Object.keys(leaseData).map(key => `${key} = ?`).join(', ');
            const sql = `UPDATE Leases SET ${placeholders} WHERE id = ?`;


            // Combine values from animeData and animeId
            const values = [...Object.values(leaseData), leaseId];

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


}