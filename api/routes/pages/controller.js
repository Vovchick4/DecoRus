import fetch from "node-fetch"
import * as collController from "../collection/controller.js"

import routes from "../../../shared/config/routes.js"

export const getHomePage = async (req, res) => {
    const response = await fetch(`${process.env.BASE_URL}/api/collections`)
    const { collections } = await response.json()

    const { lang } = req.cookies
    const tempLng = req.query?.lng
    req.i18n.changeLanguage(!tempLng ? lang || "ua" : tempLng)
    res.render('pages/home', {
        routes: routes.client,
        pageId: req.url.split("?")[0],
        activeLng: req.lng,
        full_url: req.url_lang,
        base_url: process.env.BASE_URL,
        ourLatestWork: collections
    })
}

export const getContactPage = (req, res) => {
    const { lang } = req.cookies
    const tempLng = req.query?.lng
    req.i18n.changeLanguage(!tempLng ? lang || "ua" : tempLng)
    res.render('pages/contacts', { routes: routes.client, pageId: req.url.split("?")[0], activeLng: req.lng, full_url: req.url_lang, base_url: process.env.BASE_URL })
}

export const getAdminPanelPage = (req, res) => {
    res.render('pages/admin/admin-panel', { routes: routes.admin, pageId: req.url.split("?")[0], full_url: req.url_lang, base_url: process.env.BASE_URL })
}

export const getCollectionsPage = async (req, res) => {
    const response = await fetch(`${process.env.BASE_URL}/api/collections`)
    const { collections } = await response.json()
    res.render('pages/admin/collections', { routes: routes.admin, pageId: req.url.split("?")[0], full_url: req.url_lang, base_url: process.env.BASE_URL, collections })
}