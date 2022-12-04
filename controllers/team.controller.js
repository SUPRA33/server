const db = require('../utils/db');

const getAll = async () => {
    const [teams, err] = await db.query("SELECT * FROM teams");
    return teams;
};

const getById = async (id) => {
    const [team, err] = await db.query("SELECT * FROM teams WHERE id = ?", [id]);
    if (!team) {
        return null;
    }
    return team[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO teams (team_name, logo) VALUES (?,?)", [data.team_name, data.logo]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const update = async (id, data) => {
    const team = await getById(id);
    if (!team) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE teams SET team_name = ?, logo = ? WHERE id = ? LIMIT 1", 
        [
            data.team_name || team.team_name, 
            data.logo || team.logo, 
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM teams WHERE id = ? LIMIT 1", [id]);
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