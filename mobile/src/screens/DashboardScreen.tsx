import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useUserData } from '../hooks/useUserData';
import { lessonsList, Lesson } from '../data/lessons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { getTodaysTip } from '../data/dailyTips';
import { BookOpen, Trophy, Flame, Lightbulb, ChevronRight, Lock, CheckCircle2 } from 'lucide-react-native';

const DashboardScreen = ({ navigation }: any) => {
  const { userData, loading, refetch } = useUserData();
  const [lessons, setLessons] = useState<Lesson[]>(lessonsList);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!userData.completedLessons) return;
    const completedLessonIds = userData.completedLessons.map(c => c.lesson_id);
    const updatedLessons = lessonsList.map((lesson, index) => {
      if (index === 0) return { ...lesson, unlocked: true, completed: completedLessonIds.includes(lesson.id) };
      const prevLessonCompleted = updatedLessons[index - 1]?.completed || completedLessonIds.includes(lessonsList[index - 1].id);
      return { ...lesson, unlocked: prevLessonCompleted, completed: completedLessonIds.includes(lesson.id) };
    });
    setLessons(updatedLessons);
  }, [userData.completedLessons]);

  const progressPercentage = lessons.length > 0 ? (lessons.filter(l => l.completed).length / lessons.length) * 100 : 0;
  const userXp = userData.progress?.xp || 0;
  const userLevel = userData.progress?.level || 1;
  const userStreak = userData.progress?.streak || 0;
  const todaysTip = getTodaysTip();

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bienvenue, {userData.profile?.name || 'Utilisateur'}!</Text>
        <Text style={styles.subtitle}>Continuez votre apprentissage du darija</Text>
      </View>

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} />
            <Text style={styles.statSubtext}>{lessons.filter(l => l.completed).length} / {lessons.length} leçons</Text>
          </CardContent>
        </Card>

        <Card style={styles.statCard}>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>Niveau {userLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={userXp % 100} color="#FFC800" />
            <Text style={styles.statSubtext}>{100 - (userXp % 100)} XP restants</Text>
          </CardContent>
        </Card>
      </View>

      <Card style={styles.streakCard}>
        <CardContent style={styles.streakContent}>
          <View style={styles.streakIconContainer}>
            <Flame size={32} color="#FF4B4B" />
          </View>
          <View>
            <Text style={styles.streakValue}>{userStreak} jours</Text>
            <Text style={styles.streakLabel}>Série actuelle d'apprentissage</Text>
          </View>
        </CardContent>
      </Card>

      <Text style={styles.sectionTitle}>Tes leçons</Text>
      {lessons.map((lesson) => (
        <TouchableOpacity 
          key={lesson.id}
          onPress={() => lesson.unlocked && navigation.navigate('Lesson', { lessonId: lesson.id })}
          disabled={!lesson.unlocked}
        >
          <Card style={[styles.lessonCard, !lesson.unlocked && styles.lockedCard]}>
            <CardContent style={styles.lessonContent}>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDesc} numberOfLines={1}>{lesson.description}</Text>
                <View style={styles.lessonBadgeRow}>
                  <Text style={styles.xpText}>{lesson.xpReward} XP</Text>
                  <Text style={styles.levelBadge}>{lesson.level}</Text>
                </View>
              </View>
              <View style={styles.lessonAction}>
                {lesson.completed ? (
                  <CheckCircle2 size={24} color="#58CC02" />
                ) : !lesson.unlocked ? (
                  <Lock size={24} color="#94a3b8" />
                ) : (
                  <ChevronRight size={24} color="#58CC02" />
                )}
              </View>
            </CardContent>
          </Card>
        </TouchableOpacity>
      ))}

      <Card style={styles.tipCard}>
        <CardContent style={styles.tipContent}>
          <View style={styles.tipHeader}>
            <Lightbulb size={20} color="#58CC02" />
            <Text style={styles.tipTitle}>Astuce du jour</Text>
          </View>
          <Text style={styles.tipText}>{todaysTip.tip}</Text>
        </CardContent>
      </Card>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 14,
  },
  statSubtext: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  streakCard: {
    marginBottom: 24,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  streakIconContainer: {
    backgroundColor: '#fff1f1',
    padding: 12,
    borderRadius: 50,
    marginRight: 16,
  },
  streakValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  streakLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0f172a',
  },
  lessonCard: {
    marginBottom: 12,
  },
  lockedCard: {
    opacity: 0.6,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  lessonDesc: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  lessonBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFC800',
    marginRight: 8,
  },
  levelBadge: {
    fontSize: 10,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  lessonAction: {
    marginLeft: 16,
  },
  tipCard: {
    marginTop: 12,
    backgroundColor: '#f0fdf4',
    borderColor: '#dcfce7',
  },
  tipContent: {
    paddingVertical: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
});

export default DashboardScreen;
