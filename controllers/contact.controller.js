const db = require('../utils/db');

const getAll = async () => {
    const [contacts, err] = await db.query("SELECT * FROM contacts");
    return contacts;
};

const getById = async (id) => {
    const [contact, err] = await db.query("SELECT * FROM contacts WHERE id = ?", [id]);
    if (!contact) {
        return null;
    }
    return contact[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO contacts (last_name, first_name, phone, email, message_object, message) VALUES (?,?,?,?,?)", [data.last_name, data.first_name, data.phone, data.email, data.message_object ,data.message]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM contacts WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};

module.exports = {
    getAll,
    getById,
    add,
    remove
};