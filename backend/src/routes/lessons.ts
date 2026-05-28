import express from 'express';
import { query } from '../config/db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.post('/complete', authenticateToken, async (req: AuthRequest, res) => {
  const { lessonId, xpEarned } = req.body;
  const userId = req.user?.id;

  try {
    // Insérer la complétion de leçon
    await query(
      'INSERT INTO lesson_completions (user_id, lesson_id, score) VALUES ($1, $2, $3) ON CONFLICT (user_id, lesson_id) DO NOTHING',
      [userId, lessonId, xpEarned]
    );

    // Mettre à jour la progression de l'utilisateur
    // On simplifie la logique de streak pour cet exemple
    await query(
      'UPDATE user_progress SET xp = xp + $1, level = FLOOR((xp + $1) / 100) + 1, last_active = NOW(), streak = streak + 1 WHERE user_id = $2',
      [xpEarned, userId]
    );

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
