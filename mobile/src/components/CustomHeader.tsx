import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Flame, Star } from 'lucide-react-native';

interface CustomHeaderProps {
  userData: any;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ userData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Darija Quest</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Flame size={20} color="#FF4B4B" fill="#FF4B4B" />
          <Text style={styles.statText}>{userData.progress?.streak || 0}</Text>
        </View>
        <View style={styles.statItem}>
          <Star size={20} color="#FFC800" fill="#FFC800" />
          <Text style={styles.statText}>{userData.progress?.xp || 0}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58CC02',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontWeight: 'bold',
    color: '#64748b',
  },
});
