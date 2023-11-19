// utils/db.js
/*
Changes between the mariadb and the mysql2 library:
(see db_mariadb.js for original version)

- closing the pool connection:
    mariadb: conn.end()
    mysql2: always conn.release()
- executing a SELECT query
    mariadb: const rows = await conn.query(sql);
    mysql2:  const [rows, fields] = await conn.execute(sql);
- the same is true for DML operations 
    mariadb returns only the okPacket
    mysql2 returns [okPacket, undefined]
- using parameters
    mariadb uses const rows = await conn.query(sql, singleParameter);
        (the second parameter can be a simple scalar value if we have a single parameter)
    mysql2 needs the second parameter to *always* be an array
    mysql2 needs const rows = await conn.query(sql, [ singleParameter ]);
- mysql2 also supports direct pool-queries: pool.query("SELECT 1"); 
*/

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

module.exports = {
    getConnection(){
        return new Promise(function(result, reject){
            pool.getConnection().
            then(function(conn){
               result(conn);
            }).
            catch(function(error){
                reject(error);
            });
        });

        // return pool.GetConnection();
    }
 };
 