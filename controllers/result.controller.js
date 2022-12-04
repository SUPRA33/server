const db = require('../utils/db');

const getAll = async () => {
    const [results, err] = await db.query("SELECT * FROM results");
    return results;
};

const getById = async (id) => {
    const [result, err] = await db.query("SELECT * FROM results WHERE id = ?", [id]);
    if (!result) {
        return null;
    }
    return result[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO results (date, score_home, score_ext, team_home_id, team_ext_id, logo_home_id, logo_ext_id) VALUES (?,?,?,?,?,?,?)", [data.date, data.score_home, data.score_ext, data.team_home_id, data.team_ext_id, data.logo_home_id, data.logo_ext_id]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const update = async (id, data) => {
    const result = await getById(id);
    if (!result) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE results SET result_name = ?, logo = ? WHERE id = ? LIMIT 1", 
        [
            data.date || result.date,
            data.score_home || result.score_home,
            data.score_ext || result.score_ext,
            data.team_home_id || result.team_home_id,
            data.team_ext_id || result.team_ext_id,
            data.logo_home_id || result.logo_home_id,
            data.logo_ext_id || result.logo_ext_id,
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM results WHERE id = ? LIMIT 1", [id]);
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