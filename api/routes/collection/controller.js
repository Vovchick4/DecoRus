import fetch from "node-fetch"
import { Collection } from "../../../db/models/index.js"

export const getCollection = async (req, res) => {
    const fetchColl = await Collection.find({}).sort({ _coll_id: 1 })
    res.status(200).send({ collections: fetchColl })
}

export const createCollection = async (req, res) => {
    try {
        const newCollection = await Collection.create({ ...req.body, image: { filename: "" } })
        res.status(200).send({ newCollection })
    } catch (error) {
        console.log(error?.message);
    }
}