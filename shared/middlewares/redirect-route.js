import parseCookies from "../utils/get-cookies.js";

function redirectRoute(req, res, next) {
    const token = parseCookies(req)?.authorization || null

    if (token) {
        res.redirect(`${process.env.BASE_URL}/admin-panel-page`)
    } else {
        next()
    }
}

export default redirectRoute