const db = require('../utils/db');

const getAll = async () => {
    const [sponsors, err] = await db.query("SELECT * FROM sponsors");
    return sponsors;
};

const getById = async (id) => {
    const [sponsor, err] = await db.query("SELECT * FROM sponsors WHERE id = ?", [id]);
    if (!sponsor) {
        return null;
    }
    return sponsor[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO sponsors (sponsor_name, description, link, logo) VALUES (?,?,?,?)", [data.sponsor_name, data.description, data.link, data.logo]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const update = async (id, data) => {
    const sponsor = await getById(id);
    if (!sponsor) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE sponsors SET sponsor_name = ?, description = ?, link = ? WHERE id = ? LIMIT 1", 
        [
            data.sponsor_name || sponsor.sponsor_name, 
            data.description || sponsor.description,
            data.link || sponsor.link, 
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM sponsors WHERE id = ? LIMIT 1", [id]);
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