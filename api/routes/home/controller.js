import routes from "../../../shared/config/routes.js"

export const getHomePage = (req, res) => {
    const { lang } = req.cookies
    const tempLng = req.query?.lng
    req.i18n.changeLanguage(!tempLng ? lang || "ua" : tempLng)
    res.render('pages/home', { routes, pageId: req.url, activeLng: req.lng, full_url: req.url_lang })
}   