import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

import db from "../config/db.js"

export async function createUser (req, res) {
    const user = req.body;
    console.log(user)

    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [user.email]);
        if(result.rowCount > 0) {
            return res.sendStatus(409) // conflict
        }

        const {name, email, password} = user;
        const SALT = 10;
        const passwordHash = bcrypt.hashSync(password, SALT)

        await db.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)
        `, [name, email, passwordHash]);

        res.sendStatus(201)  // created
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // internal server error
    }


}

export async function login (req, res) {
    const {email, password} = req.body;

    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (result.rowCount === 0) {
            return res.sendStatus(401) // unauthorized
        }

        if(bcrypt.compareSync(password, result.rows[0].password)) {
            const token = uuid();
            const userId = result.rows[0].id
            await db.query(`INSERT INTO tokens ("userId", value)
            VALUES ($1, $2)`, [userId, token]);

            return res.send(token)
        }

        return res.sendStatus(401) // unauthorized
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // internal server error
    }

}