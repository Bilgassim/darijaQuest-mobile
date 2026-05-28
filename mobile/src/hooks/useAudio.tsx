import { useState, useEffect } from 'react';
import { API_URL } from '../lib/api';

export const useAudio = () => {
  const [audioBaseUrl, setAudioBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${API_URL}/config`);
        if (response.ok) {
          const data = await response.json();
          setAudioBaseUrl(data.audioBaseUrl);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la config audio:', error);
      }
    };

    fetchConfig();
  }, []);

  const getFullAudioUrl = (fileName: string) => {
    if (!audioBaseUrl || !fileName) return null;
    return `${audioBaseUrl}/${fileName}`;
  };

  return { getFullAudioUrl };
};
