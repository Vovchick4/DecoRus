import express from "express";
import * as controller from "./controller.js"

import redirectRoute from "../../../shared/middlewares/redirect-route.js";
import privateRedirectRoute from "../../../shared/middlewares/private-route-redirect.js";

const router = express.Router()

router.get("/", controller.getHomePage)
router.get("/contacts", controller.getContactPage)
router.get("/admin-panel-page", privateRedirectRoute, controller.getAdminPanelPage)
router.get("/admin-panel-page/collections", privateRedirectRoute, controller.getCollectionsPage)
router.get("/admin-panel-page/log-in", redirectRoute, controller.getLogInsPage)

export default router