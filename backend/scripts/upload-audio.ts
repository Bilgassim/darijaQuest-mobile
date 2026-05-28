import * as Minio from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'darija_minio_admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'darija_minio_password'
});

const BUCKET_NAME = 'audio-lessons';

const uploadFile = async (filePath: string) => {
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);
  const stats = fs.statSync(filePath);

  try {
    await minioClient.putObject(BUCKET_NAME, fileName, fileStream, stats.size, {
      'Content-Type': 'audio/mpeg',
    });
    console.log(`✅ Fichier '${fileName}' uploadé avec succès.`);
  } catch (error) {
    console.error(`❌ Erreur lors de l'upload de '${fileName}':`, error);
  }
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: npx ts-node scripts/upload-audio.ts <chemin_vers_fichier_mp3>');
    return;
  }

  for (const filePath of args) {
    if (fs.existsSync(filePath)) {
      await uploadFile(filePath);
    } else {
      console.error(`Fichier non trouvé: ${filePath}`);
    }
  }
};

main();
