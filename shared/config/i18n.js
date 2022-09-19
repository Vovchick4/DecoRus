import i18next from "i18next"
import i18nextMiddleware from "i18next-express-middleware"
import Backend from "i18next-node-fs-backend"

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: dirname + '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['querystring', 'cookie'],
            caches: ['cookie']
        },
        fallbackLng: 'ua',
        preload: ['ua', 'en']
    });

export default i18next