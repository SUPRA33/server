const db = require('../utils/db');

const getAll = async () => {
    const [users, err] = await db.query("SELECT * FROM users");
    return users;
};

const getById = async (id) => {
    const [user, err] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) {
        return null;
    }
    return user[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO users (civility, last_name, first_name, date_birth, email, password, adress_1, adress_2, city, postal_code, country) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [data.civility, data.last_name, data.first_name, data.date_birth, data.email, data.password, data.adress_1, data.adress_2, data.city, data.postal_code, data.country]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const update = async (id, data) => {
    const user = await getById(id);
    if (!user) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE users SET civility = ?, last_name = ?, first_name = ?, date_birth = ?, email = ?, password = ?, adress_1 = ?, adress_2 = ?, city = ?, postal_code = ?, country = ? WHERE id = ? LIMIT 1", 
        [
            data.civility || user.civility, 
            data.last_name || user.last_name,
            data.first_name || user.first_name, 
            data.date_birth || user.date_birth, 
            data.email || user.email, 
            data.password || user.password, 
            data.adress_1 || user.adress_1, 
            data.adress_2 || user.adress_2, 
            data.city || user.city, 
            data.postal_code || user.postal_code,
            data.country || user.country, 
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM users WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
};