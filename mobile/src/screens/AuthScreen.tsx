import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { User, LogIn, UserPlus } from 'lucide-react-native';

const AuthScreen: React.FC = () => {
  const { signIn, signUp, enterGuestMode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    const { error } = await signIn(email, password);
    if (error) console.error(error.message);
    setIsLoading(false);
  };

  const handleSignup = async () => {
    if (!name || !email || !password || password !== confirmPassword) return;
    setIsLoading(true);
    const { error } = await signUp(email, password, name);
    if (error) console.error(error.message);
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logoText}>DarijaQuest</Text>
          <Text style={styles.subtitle}>Apprenez le darija marocain facilement</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'login' && styles.activeTab]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
            onPress={() => setActiveTab('signup')}
          >
            <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Inscription</Text>
          </TouchableOpacity>
        </View>

        <Card>
          <CardHeader>
            <CardTitle>{activeTab === 'login' ? 'Se connecter' : "S'inscrire"}</CardTitle>
            <CardDescription>
              {activeTab === 'login' 
                ? 'Connectez-vous pour continuer votre apprentissage' 
                : 'Créez votre compte pour commencer à apprendre'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === 'signup' && (
              <Input
                placeholder="Votre nom"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}
            <Input
              placeholder="votre@email.com"
              value={email}
              onChangeText={setEmail}
              type="email"
            />
            <Input
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {activeTab === 'signup' && (
              <Input
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            )}
          </CardContent>
          <CardFooter style={{ flexDirection: 'column' }}>
            <Button 
              onPress={activeTab === 'login' ? handleLogin : handleSignup}
              loading={isLoading}
              style={{ width: '100%' }}
            >
              {activeTab === 'login' ? 'Se connecter' : "S'inscrire"}
            </Button>
            
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.line} />
            </View>

            <Button
              variant="outline"
              onPress={() => {}}
              style={{ width: '100%' }}
            >
              Google
            </Button>
          </CardFooter>
        </Card>

        <TouchableOpacity onPress={enterGuestMode} style={styles.guestButton}>
          <User size={18} color="#64748b" style={{ marginRight: 8 }} />
          <Text style={styles.guestText}>Mode invité (limité à 2 leçons)</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#58CC02',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tabText: {
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#0f172a',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#94a3b8',
    fontSize: 12,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  guestText: {
    color: '#64748b',
    fontSize: 14,
  },
});

export default AuthScreen;
