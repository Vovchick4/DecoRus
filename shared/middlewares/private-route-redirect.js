import parseCookies from "../utils/get-cookies.js";

function privateRedirectRoute(req, res, next) {
    const token = parseCookies(req)?.authorization || null

    if (token) {
        next()
    } else {
        res.redirect(`${process.env.BASE_URL}/admin-panel-page/log-in`)
    }
}

export default privateRedirectRoute