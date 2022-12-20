const db = require('../utils/db');

const getAll = async () => {
    const [results, err] = await db.query("SELECT results.id, date, score_home, score_ext, home_team.logo as home_team_logo, home_team.team_name as home_team_name, ext_team.logo as ext_team_logo, ext_team.team_name as ext_team_name FROM results LEFT JOIN teams as home_team ON results.team_home_id = home_team.id LEFT JOIN teams as ext_team ON results.team_ext_id = ext_team.id");
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
    const [req, err] = await db.query("INSERT INTO results (date, score_home, score_ext, team_home_id, team_ext_id) VALUES (?,?,?,?,?)", [data.date, data.score_home, data.score_ext, data.team_home_id, data.team_ext_id]);
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
        const [req, err] = await db.query("UPDATE results SET date = ?, score_home = ?, score_ext = ?, team_home_id = ?, team_ext_id = ? WHERE id = ? LIMIT 1", 
        [
            data.date || result.date,
            data.score_home || result.score_home,
            data.score_ext || result.score_ext,
            data.team_home_id || result.team_home_id,
            data.team_ext_id || result.team_ext_id,
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