import * as Minio from 'minio';
import dotenv from 'dotenv';

dotenv.config();

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'darija_minio_admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'darija_minio_password'
});

export const BUCKET_NAME = 'audio-lessons';

export const initMinio = async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      console.log(`Bucket '${BUCKET_NAME}' créé avec succès.`);
      
      // Définir une politique publique pour la lecture seule
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Action: ['s3:GetObject'],
            Effect: 'Allow',
            Principal: '*',
            Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
          },
        ],
      };
      await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
      console.log(`Politique publique définie pour le bucket '${BUCKET_NAME}'.`);
    } else {
      console.log(`Le bucket '${BUCKET_NAME}' existe déjà.`);
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de MinIO:', error);
  }
};
