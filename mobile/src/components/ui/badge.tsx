import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  return (
    <View style={[styles.badge, styles[variant]]}>
      <Text style={[styles.text, variant === 'outline' ? styles.textOutline : styles.textWhite]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textWhite: {
    color: '#fff',
  },
  textOutline: {
    color: '#0f172a',
  },
  default: {
    backgroundColor: '#58CC02',
  },
  secondary: {
    backgroundColor: '#FFC800',
  },
  destructive: {
    backgroundColor: '#FF4B4B',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: 'transparent',
  },
});
