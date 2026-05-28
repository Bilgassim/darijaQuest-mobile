
export interface User {
  id: string;
  name: string;
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
  completedLessons: string[];
  badges: Badge[];
  avatar?: string;
  friends?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  dateEarned: string;
}

// Mock user data
export const currentUser: User = {
  id: 'user1',
  name: 'Language Learner',
  xp: 0,
  level: 1,
  streak: 0,
  lastActive: new Date().toISOString(),
  completedLessons: [],
  badges: []
};

// Calculate level based on XP
export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

// Calculate XP needed for next level
export function xpForNextLevel(level: number): number {
  return level * 100;
}

// Update streak based on user activity
export function updateStreak(user: User): User {
  const now = new Date();
  const lastActive = new Date(user.lastActive);
  const timeDiff = now.getTime() - lastActive.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // If the user was active yesterday, increase streak
  // If more than 1 day has passed, reset streak
  let updatedStreak = user.streak;
  if (daysDiff === 1) {
    updatedStreak += 1;
  } else if (daysDiff > 1) {
    updatedStreak = 1; // Reset but count today
  }
  
  return {
    ...user,
    streak: updatedStreak,
    lastActive: now.toISOString()
  };
}

// Award badges based on achievements
export function checkForBadges(user: User): Badge[] {
  const newBadges: Badge[] = [];
  
  // Level achievement badges
  if (user.level >= 5 && !user.badges.some(badge => badge.id === 'level-5')) {
    newBadges.push({
      id: 'level-5',
      name: 'Apprenti Darija',
      description: 'Atteindre le niveau 5',
      dateEarned: new Date().toISOString()
    });
  }
  
  // Streak badges
  if (user.streak >= 7 && !user.badges.some(badge => badge.id === 'streak-7')) {
    newBadges.push({
      id: 'streak-7',
      name: 'Série d\'une semaine',
      description: 'Apprendre pendant 7 jours consécutifs',
      dateEarned: new Date().toISOString()
    });
  }
  
  // Lesson completion badges
  if (user.completedLessons.length >= 10 && !user.badges.some(badge => badge.id === 'lessons-10')) {
    newBadges.push({
      id: 'lessons-10',
      name: 'Explorer de Darija',
      description: 'Compléter 10 leçons',
      dateEarned: new Date().toISOString()
    });
  }
  
  return newBadges;
}
