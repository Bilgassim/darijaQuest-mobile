import express from 'express';
import { query } from '../config/db';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const profile = await query('SELECT * FROM profiles WHERE user_id = $1', [req.user?.id]);
    const progress = await query('SELECT * FROM user_progress WHERE user_id = $1', [req.user?.id]);
    const badges = await query('SELECT * FROM user_badges WHERE user_id = $1', [req.user?.id]);
    const completions = await query('SELECT * FROM lesson_completions WHERE user_id = $1', [req.user?.id]);

    res.json({
      profile: profile.rows[0],
      progress: progress.rows[0],
      badges: badges.rows,
      completedLessons: completions.rows
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/profile', authenticateToken, async (req: AuthRequest, res) => {
  const { name, avatar, theme } = req.body;
  try {
    await query(
      'UPDATE profiles SET name = COALESCE($1, name), avatar = COALESCE($2, avatar), theme = COALESCE($3, theme), updated_at = NOW() WHERE user_id = $4',
      [name, avatar, theme, req.user?.id]
    );
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
