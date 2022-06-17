import { nanoid } from "nanoid";

import db from "../config/db.js";

export async function createShorten (req, res) {
    const {url} = req.body;
    const userId = req.userId;
    const shortUrl = nanoid(6);

    try {
        const result = await db.query(`
        INSERT INTO links (url, "urlCompressed", visitors, "userId")
        VALUES ($1, $2, $3, $4)
        `, [url, shortUrl, 0, userId] );

        return res.status(201).send({shortUrl}); // created
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // internal server error
    }
}

export async function getUrlById (req, res) {
    const {id} = req.params;

    try {
        const result = await db.query(`
        SELECT id, "urlCompressed", url FROM links WHERE id = $1
        `, [id]);

        if(result.rowCount === 0) {
            return res.status(404).send(`url não encontrada`) // Nor Found
        }
        return res.send(result.rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // internal server error
    }
}

export async function getShortUrl (req, res) {
    const {shortUrl} = req.params;

    try {
        const result = await db.query(`
        SELECT * FROM links WHERE "urlCompressed" = $1
        `, [shortUrl]);

        if(result.rowCount === 0) {
            return res.status(404).send(`url não encontrada`) // Nor Found
        };

        const upViews = (result.rows[0].visitors)+1
        const views = await db.query(`
        UPDATE links SET visitors = $1 WHERE "urlCompressed" = $2
        `, [upViews, shortUrl])

        return res.redirect(result.rows[0].url)
    } catch (error) {
         console.log(error);
        return res.sendStatus(500); // internal server error
    }
}