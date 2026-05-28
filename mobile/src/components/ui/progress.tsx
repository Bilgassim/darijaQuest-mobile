import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ProgressProps {
  value: number; // 0 to 100
  style?: any;
  color?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, style, color = '#58CC02' }) => {
  const animatedValue = React.useRef(new Animated.Value(value)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.bar, { width, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 5,
  },
});
