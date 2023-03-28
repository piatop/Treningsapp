import express from 'express'
import * as pg from 'pg'
import "dotenv/config";
const { Client } = pg.default;
const { createHmac } = await import('node:crypto');
const userRoute = express.Router();

const database = process.env.DATABASE_URL;

const credentials = {
    connectionString: database,
    ssl: {
        rejectUnauthorized: false
    }
}

userRoute.post('/register', async (req, res) => {


    const email = req.body.mail;
    const psw = req.body.password;

    const client = new Client(credentials);
    try {
        const pswHash = createHmac('sha256', psw).digest('hex');
        await client.connect();

        let results = await client.query('INSERT INTO public."users"("mail", "password") VALUES ($1, $2) RETURNING *', [email, pswHash]);
        if (results.rowCount > 0) {
            res.send({ "registrering": "OK!" })
        } else {
            res.status(400).send({ "Feil": "Brukerregistrering feilet" });
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    } finally {
        await client.end();
    }
})

userRoute.post('/login', async (req, res) => { //Trenger en GET for å hente info, POST er for å sjekke om dette er en ekte bruker. GET må ha en spørring: select all(?) from table exercises(?) where id=den som er logget inn
    const client = new Client(credentials);
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex'); //Krypterer passordet med en algoritme så det blir uleselig for menneske. Når brukeren skal logge inn sendes passordet i samme algoritnme og sjekkes om den er lik
        await client.connect();

        let results = await client.query('SELECT * FROM "public"."users" WHERE "mail" = $1 AND "password" = $2', [req.body.mail, hash]);

        if (results.rowCount > 0) {
            res.send({ "Login": "OK" })
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    } finally {
        await client.end();
    }
})


export default userRoute;

