const db = require('../utils/db');

const getAll = async () => {
    const [products, err] = await db.query("SELECT * FROM products");
    return products;
};

const getById = async (id) => {
    const [product, err] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (!product) {
        return null;
    }
    return product[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO products (product_name, category, price, product_image) VALUES (?,?,?,?)", [data.product_name, data.category, data.price, data.product_image]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const update = async (id, data) => {
    const product = await getById(id);
    if (!product) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE products SET product_name = ?, category = ?, price = ?, product_image = ? WHERE id = ? LIMIT 1", 
        [
            data.product_name || product.product_name,
            data.category || product.category,
            data.price || product.price,
            data.product_image || product.product_image,
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM products WHERE id = ? LIMIT 1", [id]);
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