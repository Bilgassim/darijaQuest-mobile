import { Platform } from 'react-native';

// Pour l'émulateur Android, localhost est 10.0.2.2
// Pour iOS, localhost est localhost
export const API_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:3000/api' 
  : 'http://localhost:3000/api';

export const getAuthHeader = async (AsyncStorage: any) => {
  const token = await AsyncStorage.getItem('darija_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};
