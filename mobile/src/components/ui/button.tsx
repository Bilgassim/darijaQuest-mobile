import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  variant = 'default',
  size = 'default',
  disabled,
  loading,
  style,
}) => {
  const getButtonStyle = () => {
    const styles_list: ViewStyle[] = [styles.base];
    
    if (variant === 'default') styles_list.push(styles.variantDefault);
    if (variant === 'destructive') styles_list.push(styles.variantDestructive);
    if (variant === 'outline') styles_list.push(styles.variantOutline);
    if (variant === 'secondary') styles_list.push(styles.variantSecondary);
    
    if (size === 'sm') styles_list.push(styles.sizeSm);
    if (size === 'lg') styles_list.push(styles.sizeLg);
    
    if (disabled) styles_list.push(styles.disabled);
    if (style) styles_list.push(style);
    
    return styles_list;
  };

  const getTextStyle = () => {
    const styles_list: TextStyle[] = [styles.textBase];
    if (variant === 'default' || variant === 'destructive') styles_list.push(styles.textWhite);
    if (variant === 'outline' || variant === 'ghost' || variant === 'link') styles_list.push(styles.textPrimary);
    if (size === 'sm') styles_list.push(styles.textSm);
    return styles_list;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyle()}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'default' ? '#fff' : '#58CC02'} />
      ) : (
        typeof children === 'string' ? (
          <Text style={getTextStyle()}>{children}</Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textBase: {
    fontWeight: '600',
    fontSize: 16,
  },
  variantDefault: {
    backgroundColor: '#58CC02', // darija-primary
  },
  variantDestructive: {
    backgroundColor: '#FF4B4B',
  },
  variantOutline: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: 'transparent',
  },
  variantSecondary: {
    backgroundColor: '#FFC800',
  },
  sizeSm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sizeLg: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  textWhite: {
    color: '#ffffff',
  },
  textPrimary: {
    color: '#58CC02',
  },
  textSm: {
    fontSize: 14,
  },
});
