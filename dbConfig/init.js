<<<<<<< HEAD
const {Pool} = require("pg")
=======
const {Pool} = require('pg');
>>>>>>> 23f40e1d214d884ce1c44223ad5776910366e7fc

let config;
if(process.env.DATABASE_URL){
    config = {
        connectionString:process.env.DATABASE_URL,
        ssl:{
            rejectUnauthorized: false
        }
    }
}

const pool = new Pool(config)

module.exports = pool;
