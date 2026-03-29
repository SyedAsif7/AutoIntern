import express from 'express';
import { getFullReport, downloadPDFReport, downloadCertificate } from '../controllers/reportController.js';

const router = express.Router();

router.get('/:id/report', getFullReport);
router.get('/:id/report/pdf', downloadPDFReport);
router.get('/:id/certificate', downloadCertificate);

export default router;
