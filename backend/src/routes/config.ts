import express from 'express';
import { BUCKET_NAME } from '../config/minio';
import { Platform } from 'react-native';

const router = express.Router();

router.get('/config', (req, res) => {
  // Détecter l'hôte pour MinIO
  // Si la requête vient de l'émulateur Android, l'URL MinIO doit être 10.0.2.2:9000
  const host = req.hostname === 'localhost' || req.hostname === '127.0.0.1' ? 'localhost' : '10.0.2.2';
  
  res.json({
    audioBaseUrl: `http://${host}:9000/${BUCKET_NAME}`
  });
});

export default router;
