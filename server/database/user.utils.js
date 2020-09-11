const mysqlKnex = require("./mysql-knex")

const getUsers = async () => {
    try {
        const data = await mysqlKnex("user").select('*');
        const [{ total }] = await mysqlKnex("user").count({ total: "*" });
        return { data, total }
    } catch (error) {
        console.trace(error);
        return null;
    }

}
const getUserById = async (userId) => {
    try {
        const [data] = await mysqlKnex("user").select('*').where("id", "=", userId);
        return data
    } catch (error) {
        console.trace(error);
        return null;
    }
}
module.exports = {
    getUsers,
    getUserById
}