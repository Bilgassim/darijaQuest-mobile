import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUserData } from '../hooks/useUserData';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { User, Trophy, Flame, Star, LogOut, Settings } from 'lucide-react-native';

const ProfileScreen = ({ navigation }: any) => {
  const { userData, updateProfile } = useUserData();
  const { signOut } = useAuth();

  const level = userData.progress?.level || 1;
  const xp = userData.progress?.xp || 0;
  const streak = userData.progress?.streak || 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{userData.profile?.name?.charAt(0).toUpperCase() || 'U'}</Text>
        </View>
        <Text style={styles.userName}>{userData.profile?.name || 'Utilisateur'}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.iconStat}>
            <Star size={16} color="#58CC02" />
            <Text style={styles.iconStatText}>Niveau {level}</Text>
          </View>
          <View style={styles.iconStat}>
            <Trophy size={16} color="#FFC800" />
            <Text style={styles.iconStatText}>{xp} XP</Text>
          </View>
          <View style={styles.iconStat}>
            <Flame size={16} color="#FF4B4B" />
            <Text style={styles.iconStatText}>{streak} jours</Text>
          </View>
        </View>
      </View>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Leçons terminées</Text>
            <Text style={styles.statValue}>{userData.completedLessons?.length || 0}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>XP Total</Text>
            <Text style={styles.statValue}>{xp}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Série actuelle</Text>
            <Text style={styles.statValue}>{streak} jours</Text>
          </View>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Tes accomplissements</CardDescription>
        </CardHeader>
        <CardContent style={styles.badgeGrid}>
          {userData.badges && userData.badges.length > 0 ? (
            userData.badges.map((badge: any) => (
              <View key={badge.id} style={styles.badgeItem}>
                <Trophy size={24} color="#58CC02" />
                <Text style={styles.badgeName}>{badge.badge_id}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Aucun badge pour le moment</Text>
          )}
        </CardContent>
      </Card>

      <View style={styles.actions}>
        <Button variant="outline" onPress={() => {}} style={styles.actionButton}>
          <Settings size={20} color="#64748b" style={{ marginRight: 8 }} />
          Paramètres
        </Button>
        <Button variant="destructive" onPress={signOut} style={styles.actionButton}>
          <LogOut size={20} color="#fff" style={{ marginRight: 8 }} />
          Déconnexion
        </Button>
      </View>
      
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
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#58CC02',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  iconStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconStatText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    alignItems: 'center',
    width: '30%',
    padding: 8,
  },
  badgeName: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    color: '#64748b',
  },
  emptyText: {
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
    width: '100%',
  },
  actions: {
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
});

export default ProfileScreen;
