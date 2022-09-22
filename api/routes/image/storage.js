import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage';
// import { promisify } from 'util'

// Create GridFs storage for multer middleware
const storage = new GridFsStorage({
    url: process.env.MONGO_URL + process.env.MONGO_DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-bezkoder-${file.originalname}`;
            return filename;
        }


        return {
            bucketName: 'file',
            filename: `${Date.now()}-bezkoder-${file.originalname}`
        };
    }
});

export default multer({ storage });