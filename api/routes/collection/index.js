import express from "express";
import * as controller from "./controller.js"

const router = express.Router()

router.get("/", controller.getCollections)
router.get("/:collId", controller.getCollectionById)
router.post("/create", controller.createCollection)
router.patch("/update/:collId", controller.updateCollection)
router.delete("/delete/:collId", controller.removeCollection)

export default router