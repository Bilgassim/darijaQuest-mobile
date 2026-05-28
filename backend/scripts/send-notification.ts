import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { query } from '../src/config/db';

const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ ERREUR: Le fichier serviceAccountKey.json est introuvable à la racine du backend.");
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const sendTestNotification = async () => {
  try {
    // 1. Récupérer un token récent depuis la base de données
    const result = await query('SELECT token FROM fcm_tokens ORDER BY last_seen DESC LIMIT 1');
    
    if (result.rows.length === 0) {
      console.log("❌ Aucun token trouvé dans la base de données. Assurez-vous d'avoir lancé l'application sur votre téléphone.");
      process.exit(1);
    }

    const token = result.rows[0].token;
    console.log(`📡 Envoi de la notification au token: ${token.substring(0, 20)}...`);

    // 2. Construire le message
    const message = {
      notification: {
        title: '🎉 Bravo !',
        body: 'Tes notifications Firebase fonctionnent parfaitement sur DarijaQuest !',
      },
      token: token,
    };

    // 3. Envoyer
    const response = await admin.messaging().send(message);
    console.log('✅ Notification envoyée avec succès ! Message ID:', response);
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la notification:', error);
  } finally {
    process.exit(0);
  }
};

sendTestNotification();
