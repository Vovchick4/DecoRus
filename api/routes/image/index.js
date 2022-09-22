import express from 'express';

import * as controller from './controller.js';

import upload from './storage.js';

// Create router
const router = express.Router();

// Route for receiving image
router.get('/:imageName', controller.getImage);

export default router;