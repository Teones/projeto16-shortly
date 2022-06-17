import db from "../config/db.js"

export const userAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).send(`token ausente`)
    }
    const token = authHeader.split(" ")[1];

    const result = await db.query(`
        SELECT * FROM tokens WHERE value = $1
    `, [token]);

    if(result.rowCount === 0) {
        return res.status(401).send(`token não existe`)
    };

    req.userId = result.rows[0].userId;

    next();
}