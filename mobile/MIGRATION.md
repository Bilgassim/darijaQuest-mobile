# 🚀 Migration DarijaQuest : Web vers React Native

Ce document détaille les étapes et les choix techniques effectués pour transformer le projet React Vite en une application mobile React Native robuste.

## 📁 Architecture du Projet

Le projet suit une structure modulaire adaptée au développement mobile :

```
DarijaQuestMobile/
├── src/
│   ├── assets/          # Images, sons et polices locales
│   ├── components/      # Composants UI réutilisables
│   │   ├── ui/          # Atomes (Boutons, Cards, Inputs natifs)
│   │   └── ...          # Composants complexes (CustomHeader, etc.)
│   ├── navigation/      # Configuration de React Navigation (Tabs, Stack)
│   ├── screens/         # Écrans principaux de l'application
│   ├── hooks/           # Hooks personnalisés (Auth, UserData, Offline)
│   ├── data/            # Données statiques (Leçons, Astuces)
│   ├── integrations/    # Clients externes (Supabase)
│   └── lib/             # Utilitaires
├── App.tsx              # Point d'entrée avec les Providers
└── index.js             # Enregistrement de l'application
```

## 🛠️ Correspondance des Composants

Conformément à la mission, les composants web ont été migrés vers leurs équivalents natifs :

| Web (HTML/React) | React Native Equivalent | Commentaire |
|------------------|-------------------------|-------------|
| `div`            | `View`                  | Conteneur de base flexbox par défaut. |
| `span`, `p`, `h1`| `Text`                  | Tout texte doit être dans un composant `<Text>`. |
| `button`         | `TouchableOpacity`      | Gère les retours visuels au clic via `activeOpacity`. |
| `onClick`        | `onPress`               | Événement de pression standard en mobile. |
| `img`            | `Image`                 | Nécessite des dimensions explicites ou `flex`. |
| `input`          | `TextInput`             | Adapté avec `secureTextEntry` pour les mots de passe. |

## 🎨 Système de Styles

- **StyleSheet.create** : Tous les styles Tailwind CSS ont été convertis en objets `StyleSheet`.
- **Flexbox** : En React Native, `display: flex` est le défaut et `flexDirection` est `column` par défaut (contrairement au web).
- **Couleurs** : Les variables de thème (darija-primary, etc.) ont été intégrées directement dans les composants UI pour plus de robustesse.

## 📚 Remplacement des Librairies

| Librairie Web | Remplacement Native | Raison |
|---------------|---------------------|--------|
| `react-router-dom` | `@react-navigation/native` | Navigation optimisée pour les gestes mobiles (swipe, back). |
| `material-ui` / `shadcn` | `react-native-paper` / Custom UI | Composants légers et performants pour mobile. |
| `lucide-react` | `lucide-react-native` | Utilisation de SVGs natifs via `react-native-svg`. |
| `localStorage` | `AsyncStorage` | Persistance asynchrone spécifique au mobile. |
| `Capacitor Network`| `@react-native-community/netinfo` | Accès direct aux APIs réseau natives. |

## 🔐 Authentification & Données

- **Supabase** : Configuré pour utiliser `AsyncStorage` pour la persistance de session.
- **Offline Mode** : Le hook `useOfflineMode` a été réécrit pour utiliser `NetInfo` au lieu des plugins Capacitor, permettant une détection de connexion plus fiable.
- **Guest Mode** : Toujours supporté via une persistance locale dans `AsyncStorage`.

## 📱 Ajustements Android/iOS

1. **SafeAreaView** : Utilisé via `react-native-safe-area-context` pour éviter que l'UI ne soit cachée par les encoches (notches) ou les barres système.
2. **KeyboardAvoidingView** : Ajouté sur l'écran d'authentification pour que le clavier ne cache pas les champs de saisie.
3. **Optimisation des Images** : Les icônes SVG sont préférées pour une netteté parfaite sur toutes les densités de pixels (Retina/HDPI).

## 🚀 Prochaines Étapes recommandées

1. **Audio Natif** : Remplacer l'audio HTML5 par `react-native-video` ou `expo-av` pour une lecture fluide des sons de leçons.
2. **Splash Screen** : Configurer les écrans de démarrage natifs pour Android et iOS.
3. **Push Notifications** : Finaliser l'intégration avec Firebase (Android) et APNs (iOS) en utilisant `@react-native-firebase/messaging`.
