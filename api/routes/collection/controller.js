import fetch from "node-fetch"
import { Collection } from "../../../db/models/index.js"

export const getCollectionById = async (req, res) => {
    const fetchColl = await Collection.findById(req.params.collId)
    res.status(200).send({ collection: fetchColl })
}

export const getCollections = async (req, res) => {
    const fetchColls = await Collection.find({}).sort({ _coll_id: 1 })
    res.status(200).send({ collections: fetchColls })
}

export const createCollection = async (req, res) => {
    try {
        const newCollection = await Collection.create({ ...req.body, image: { filename: "" } })
        res.status(201).send({ newCollection })
    } catch (error) {
        console.log(error?.message);
    }
}

export const updateCollection = async (req, res) => {
    try {
        const collId = req.params.collId
        if (!collId) {
            res.status(400).send({ message: "You must set carId" })
        }
        await Collection.updateOne({ _id: collId }, { $set: { ...req.body } })
        const updatedColl = await getCollectionById(req, res)
        res.status(200).send({ updatedColl })
    } catch (error) {
        console.log(error?.message);
    }
}

export const removeCollection = async (req, res) => {
    try {
        const removedColl = await Collection.findByIdAndRemove(req.params.collId)
        res.status(204).send({ removedColl })
    } catch (error) {
        console.log(error?.message);
    }
}