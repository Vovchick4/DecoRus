import express from "express";
import * as controller from "./controller.js"

const router = express.Router()

router.get("/", controller.getHomePage)
router.get("/contacts", controller.getContactPage)
router.get("/admin-panel-page", controller.getAdminPanelPage)
router.get("/collections", controller.getCollectionsPage)

export default router