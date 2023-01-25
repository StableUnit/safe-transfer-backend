import express, { Express } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'



import appRoutes from './routes'

import * as dotenv from "dotenv";
const envPath = "../.env/.safe-transfer.env";
dotenv.config({ path: envPath });

const app: Express = express()
const PORT: string | number = process.env.PORT || 4000
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(appRoutes)


import https from 'https';
import fs from 'fs';
const options = {
    key: fs.readFileSync(`secret/key.pem`),
    cert: fs.readFileSync(`secret/cert.pem`)
  };
https.createServer(options, app).listen(443)

const MONGO_URL: string = process.env.MONGO_URL || "cluster0.xh4in.mongodb.net";
const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('strictQuery', false);
mongoose
    .connect(uri)
    .then(() =>
        https
        .createServer(app)
        .listen(PORT, () =>
            console.log(`Server running on https://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
