const db = require('../utils/db');

const getAll = async () => {
    const [members, err] = await db.query("SELECT * FROM members");
    return members;
};

const getById = async (id) => {
    const [member, err] = await db.query("SELECT * FROM members WHERE id = ?", [id]);
    if (!member) {
        return null;
    }
    return member[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO members (civility, last_name, first_name, nickname, nationality, date_birth, city_birth, email, adress_1, adress_2, city, postal_code, country, image, team_id, category, role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [data.civility, data.last_name, data.first_name, data.nickname, data.nationality, data.date_birth, data.city_birth, data.email, data.adress_1, data.adress_2, data.city, data.postal_code, data.country, data.image, data.team_id, data.category, data.role]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const update = async (id, data) => {
    const member = await getById(id);
    if (!member) {
        return null;
    } else {
        const [req, err] = await db.query("civility = ?, last_name = ?, first_name = ?, nickname = ?, nationality = ?, date_birth = ?, city_birth = ?, email = ?, adress_1 = ?, adress_2 = ?, city = ?, postal_code = ?, country = ?, image = ?, team_id = ?, category = ?, role = ? WHERE id = ? LIMIT 1", 
        [
            data.civility || member.civility,
            data.last_name || member.last_name,
            data.first_name || member.first_name,
            data.nickname || member.nickname,
            data.nationality || member.nationality,
            data.date_birth || member.date_birth,
            data.city_birth || member.city_birth,
            data.email || member.email,
            data.adress_1 || member.adress_1,
            data.adress_2 || member.adress_2,
            data.city || member.city,
            data.postal_code || member.postal_code,
            data.country || member.country,
            data.image || member.image,
            data.team_id || member.team_id,
            data.category || member.category,
            data.role || member.role,
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM members WHERE id = ? LIMIT 1", [id]);
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