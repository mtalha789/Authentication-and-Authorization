const mysql =require('mysql2')

const configDb = {
    host: 'localhost',
    user: 'root',
    database: 'auth',
    password:'mypassword@786'
}
//create connection

const connection = mysql.createPool(configDb)

module.exports = connection