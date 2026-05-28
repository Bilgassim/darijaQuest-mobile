import express from 'express';
import { BUCKET_NAME } from '../config/minio';

const router = express.Router();

router.get('/config', (req, res) => {
  // Avec adb reverse, localhost:9000 sur le téléphone pointera vers le PC
  res.json({
    audioBaseUrl: `http://localhost:9000/${BUCKET_NAME}`
  });
});

export default router;
