import { Collection } from '../../../db/models/index.js';
import { gridFSBucketService } from '../../../shared/services/grid-fs-bucket.js'

// Model of the collection 'Decorus'

// Handler for server error
import resServerError from '../../../shared/utils/response-server-error.js';

export const uploadImageToCollection = async (req, res) => {
    try {
        const newImage = req.file

        if (!newImage) {
            res.status(400).json({
                message: "You Must Set Image"
            });
            return
        }
        const imgUrl = `/api/image/${newImage.originalname}`

        const coll = await Collection.findByIdAndUpdate(
            req.params.collId,
            {
                image: { filename: imgUrl }
            },
            { new: true }
        );

        res.status(201).json({
            coll,
            imgUrl
        });
    } catch (e) {
        resServerError(res, e);
    }
};

export const removeImage = async (req, res) => {
    try {
        await Collection.findByIdAndUpdate(
            req.params.carId,
            {
                image: {}
            },
            { new: true }
        );
        res.status(200).json({ message: "Succ" })
    } catch (e) {
        resServerError(res, e)
    }
};

export const getImage = async (req, res) => {
    try {
        gridFSBucketService.gfs.find({ filename: new RegExp(req.params.collId, 'i') })
            .toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(404).json({
                        message: `Зображення з даним іменем відсутнє. ${err}`
                    });
                }
                gridFSBucketService.gfs
                    .openDownloadStreamByName(files[0].filename)
                    .pipe(res)
            });
    } catch (e) {
        resServerError(res, e)
    }
};