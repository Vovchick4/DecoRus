import jwt from 'jsonwebtoken'
import parseCookies from "../utils/get-cookies.js"

export default (req, res, next) => {
    const token = parseCookies(req)?.authorization || null
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
            req.user = { ...decoded }
            // Hopefully
            // req.user = getUserById(decoded.userId)
        } catch (e) {
            // Handle Errors or renewals
            req.user = null
            // You could either next() to continue or use 'res' to respond something
        }
    } else {
        req.user = null
    }
    next()
}