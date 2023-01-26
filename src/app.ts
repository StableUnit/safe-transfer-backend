import express, { Express } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'



import appRoutes from './routes'

import * as dotenv from "dotenv";
const envPath = "../.env/.safe-transfer.env";
dotenv.config({ path: envPath });

const app: Express = express();
const HTTP_PORT: string | number = process.env.PORT || 80;
const HTTPS_PORT: string | number = process.env.PORT || 443;
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(appRoutes)


import https from 'https';
import http from 'http';
import fs from 'fs';
const options = {
    key: fs.readFileSync(`../.env/secret/key.pem`),
    cert: fs.readFileSync(`../.env/secret/cert.pem`)
};

const MONGO_URL: string = process.env.MONGO_URL || "cluster0.xh4in.mongodb.net";
const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('strictQuery', false);
mongoose
    .connect(uri)
    .then(() => {
        http
            .createServer(app)
            .listen(HTTP_PORT, () =>
                console.log(`Server running on http://localhost:${HTTP_PORT}`)
            )
        https
            .createServer(options, app)
            .listen(HTTPS_PORT, () =>
                console.log(`Server running on https://localhost:${HTTPS_PORT}`)
            )
    })
    .catch((error) => {
        throw error
    })
