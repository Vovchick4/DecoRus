import routes from "../../../shared/config/routes.js"

export const getContactPage = (req, res) => {
    req.i18n.changeLanguage(req.url_lang);
    res.render('pages/contacts', { routes, pageId: req.url, activeLng: req.lng, full_url: req.url_lang })
}   