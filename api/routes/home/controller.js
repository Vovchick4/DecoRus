import routes from "../../../shared/config/routes.js"

export const getHomePage = (req, res) => {
    res.render('pages/home', { routes, pageId: req.url })
}   