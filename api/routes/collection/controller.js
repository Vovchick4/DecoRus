import { Collection } from "../../../db/models/index.js"

export const getCollection = async (req, res) => {
    const fetchColl = await Collection.find({}).sort({ _coll_id: 1 })
    res.status(200).send({ collection: fetchColl })
}