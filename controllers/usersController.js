import bcrypt from "bcrypt"

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
    const user = req.body;
    console.log(user)

    try {
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // internal server error
    }

}