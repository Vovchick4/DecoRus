import path from "path";
import express from "express"
import i18next from "i18next"
import partials from "express-partials"
import Backend from "i18next-node-fs-backend"
import i18nextMiddleware from "i18next-http-middleware"

import API from "./api/index.js"
import { fileURLToPath } from 'url'
import filesRoutes from "./sendFiles/index.js"
import middlewares from "./shared/middlewares/index.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 4000

i18next.use(i18nextMiddleware.LanguageDetector).use(Backend).init({
    backend: {
        loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
    },
    debug: false,
    detection: {
        order: ['querystring', 'cookie', 'header'],
        lookupCookie: 'lang',
        lookupQuerystring: 'lang',
        caches: ['cookie']
    },
    preload: ["en", "ua"],
    saveMissing: true,
    fallbackLng: ["ua"],
});

function bootstrap() {
    app.set('views', path.join(__dirname, 'views'));
    app.set("view engine", "ejs")
    app.use(partials())

    filesRoutes(app, express, __dirname)

    middlewares(app, express, __dirname)

    app.use(i18nextMiddleware.handle(i18next, { removeLngFromUrl: false }));

    // app.use(function (req, res, next) {
    //     const ignoreKeys = ["/css/bootstarp.css", "/js/jquery.js", "/js/bootstrap.bundle.min.js"]
    //     const match = req.url.match(/^\/([A-Z]{2})([\/\?].*)?$/i);

    //     if (ignoreKeys.includes(req.url)) {
    //         next()
    //         return
    //     }

    //     if (match) {
    //         req.url_lang = match[1];
    //         req.url = match[2] || '/';
    //     }

    //     next();
    // });

    // app.use('/:locale', (req, res, next) => {
    //     let activeLocale = req.body?.locale || "ua"
    //     if (activeLocale)
    //         req.i18n.changeLanguage(req.url_lang)
    //     next();
    // })

    API(app)

    app.listen(PORT, () => {
        console.log("Start server on", PORT)
    })
}

bootstrap()