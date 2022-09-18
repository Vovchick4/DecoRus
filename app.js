import path from "path";
import express from "express"

import { fileURLToPath } from 'url';
import filesRoutes from "./sendFiles/index.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = 4000

function bootstrap() {
    app.set("view engine", "ejs")

    filesRoutes(app, express, __dirname)

    app.get("/", (req, res) => {
        res.render('pages/home', { port: PORT })
    })

    app.listen(PORT, () => {
        console.log("Start server on", PORT);
    })
}

bootstrap()