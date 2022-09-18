import express from "express";
import * as controller from "./controller.js"

const router = express.Router()

router.get("/", controller.getHomePage)

export default router