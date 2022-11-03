import express from 'express';

import * as controller from './controller.js';

import upload from './storage.js';

// Create router
const router = express.Router();

// Route for creating image
router.post(
    '/create/:collId',
    upload.single('file'),
    controller.uploadImageToCollection
);

// Route for removing image
router.delete(
    '/delete/:collId',
    controller.removeImage
);

// Route for receiving image
router.get('/:collId', controller.getImage);

export default router;