import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userResult = await query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );
    const userId = userResult.rows[0].id;

    // Créer le profil
    await query('INSERT INTO profiles (user_id, name) VALUES ($1, $2)', [userId, name]);
    // Créer la progression
    await query('INSERT INTO user_progress (user_id) VALUES ($1)', [userId]);

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string);
    res.json({ token, user: { id: userId, email, name } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const profileResult = await query('SELECT name FROM profiles WHERE user_id = $1', [user.id]);
    const profile = profileResult.rows[0];

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.json({ token, user: { id: user.id, email, name: profile.name } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
