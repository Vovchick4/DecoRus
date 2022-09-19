import routes from "../../../shared/config/routes.js"

export const getHomePage = (req, res) => {
    req.i18n.changeLanguage(req.url_lang);
    res.render('pages/home', { routes, pageId: req.url, activeLng: req.lng, full_url: req.url_lang })
}   