const path = "../data/db.sqlite";
const dbConfig = {
    host: "localhost",
    port: 3306,
    username: "netd",
    password: "123456aA@",
    database: "todoist",
}

const mysqlKnex = require('knex')({
    client: 'mysql',
    connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database
    }
});

(() => {
    mysqlKnex.raw("select 1 + 1 as total")
        .then(([[data]]) => {
            if (data.total === 2) {
                console.log("knex ok!")
            } else {
                throw "knex error!!!"
            }
        })
        .catch(error => console.trace(error))
})()


module.exports = mysqlKnex;