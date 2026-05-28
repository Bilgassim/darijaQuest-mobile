import { Platform } from 'react-native';

// On utilise localhost pour toutes les plateformes.
// Pour que cela fonctionne sur un téléphone Android physique, 
// il faut lancer la commande : adb reverse tcp:3000 tcp:3000
export const API_URL = 'http://localhost:3000/api';

export const getAuthHeader = async (AsyncStorage: any) => {
  const token = await AsyncStorage.getItem('darija_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};
