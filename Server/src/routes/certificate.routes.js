import express from 'express';
import { generateCertificate, downloadCertificate } from '../controllers/certificateController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to generate a certificate

router.route("/generate").post(verifyJWT,generateCertificate);
// Route to download a certificate

router.route("/download/:fileName").get(verifyJWT,downloadCertificate);

export default router;
