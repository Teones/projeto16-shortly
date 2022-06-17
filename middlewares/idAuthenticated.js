import db from "../config/db.js"

export const idAuthenticated = async (req, res, next) => {
    const {id} = req.params;
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).send(`token ausente`)
    }
    const token = authHeader.split(" ")[1];

    const result = await db.query(`
        SELECT * FROM tokens WHERE value = $1
    `, [token]);

    if(result.rowCount === 0) {
        return res.status(401).send(`token não encontrado`)
    };


    const link = await db.query(`
        SELECT * FROM links WHERE "userId" = $1
        `, [result.rows[0].userId]);

    if(result.rows[0].userId != link.rows[0].userId) {
        return res.status(401).send(`token não coincide`)
    }

    req.userId = result.rows[0].userId;

    next();
}