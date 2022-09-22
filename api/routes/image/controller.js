import { gridFSBucketService } from '../../../shared/services/grid-fs-bucket.js'

// Model of the collection 'Decorus'

// Handler for server error
import resServerError from '../../../shared/utils/response-server-error.js';

export const getImage = async (req, res) => {
    try {
        gridFSBucketService.gfs.find({ filename: new RegExp(req.params.imageName, 'i') })
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