var Promise = require("bluebird");
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.COLLECTION_DB_HOST,
    user: process.env.COLLECTION_DB_USER,
    password: process.env.COLLECTION_DB_PASS,
    database: process.env.COLLECTION_DB_DATABASE,
  });

  let promises = [];

promises[0] = new Promise((resolve, reject) => {
    let sql = `select * from user_snapshots limit 1`;
    pool.query(sql, (error, result) => {
        if (error) {
            reject(error);
        }

        resolve(result);
    })
});

promises[1] = new Promise((resolve, reject) => {
    let sql = `select * from mid_desk_assignments limit 1`;
    pool.query(sql, (error, result) => {
        if (error) {
            reject(error);
        }

        resolve(result);
    })
});

promises[2] = new Promise((resolve, reject) => {
    let sql = `select * from mid_desk_spins limit 1`;
    pool.query(sql, (error, result) => {
        if (error) {
            reject(error);
        }

        resolve(result);
    })
});

Promise.each(promises, function(results) {
    console.log(results);
}).catch(function(err) {
    console.log(err);
});
