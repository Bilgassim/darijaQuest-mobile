# DarijaQuest Mobile - Project Instructions

This project is a React Native mobile application for learning Moroccan Darija, migrated from a web-based version.

## 🚀 Project Overview

- **Core Framework**: React Native 0.85.3 (TypeScript)
- **Navigation**: `@react-navigation/native` (Bottom Tabs & Native Stack)
- **State Management**: TanStack Query (React Query)
- **UI Framework**: `react-native-paper` + Custom Atomic UI Components
- **Backend/Auth**: Custom Node.js/Express API + PostgreSQL + MinIO (Docker)
- **API URL**: Managed in `src/lib/api.ts`
- **Storage**: `AsyncStorage` (for local persistence and Guest Mode)
- **Icons**: `lucide-react-native`
- **Network Status**: `@react-native-community/netinfo`

## 📁 Architecture

- `src/components/`: Reusable UI components.
  - `src/components/ui/`: Atomic components (Button, Card, Input, Progress, Badge).
- `src/screens/`: Main application screens (Auth, Dashboard, Lesson, Profile).
- `src/navigation/`: App navigation logic and navigators.
- `src/hooks/`: Custom React hooks (useAuth, useUserData, useOfflineMode).
- `src/data/`: Pedagogical content and static data (lessons.ts, dailyTips.ts).
- `src/lib/`: Helper functions and utilities (API config).

## 🛠 Building and Running

### Prerequisites
- Node.js (>= 22.11.0)
- React Native environment (Android Studio / Xcode)

### Commands
- **Install**: `npm install`
- **Start Metro**: `npm start`
- **Run Android**: `npm run android`
- **Run iOS**: `npm run ios` (requires `bundle exec pod install` in `ios/` folder)
- **Test**: `npm test` (Jest)
- **Lint**: `npm run lint`

## 📏 Development Conventions

### Styling
- **No Tailwind**: Do NOT use Tailwind CSS. All styling must use `StyleSheet.create`.
- **Flexbox**: Remember that `flexDirection` defaults to `column` in React Native.
- **Atomic UI**: Prefer using components from `src/components/ui` for consistency.

### UI Standards
- **Text**: Always wrap text in the `<Text>` component from `react-native`.
- **Interactivity**: Use `TouchableOpacity` or `Pressable` for buttons/links.
- **SafeArea**: Use `SafeAreaView` from `react-native-safe-area-context` to handle notches and system bars.
- **Keyboard**: Use `KeyboardAvoidingView` for screens with input fields to prevent the keyboard from covering the UI.

- **Logic & State**: Custom hooks for Auth (JWT), User Data, and Audio.
- **Audio Storage**: Files are served from MinIO. Use `useAudio` hook to resolve full URLs.

## 📁 Architecture
...
- `src/hooks/`: Custom React hooks (useAuth, useUserData, useOfflineMode, useAudio).
- `src/data/`: Pedagogical content and static data (lessons.ts, dailyTips.ts).
...
### Logic & State
- **Auth**: Use the `useAuth` hook for authentication state (JWT) and guest mode.
- **Data**: Use `useUserData` for profile, progress, and lesson completion logic via the custom API.
- **Offline**: Use `useOfflineMode` to handle data caching and synchronization with the backend.
- **Audio**: Add `audioUrl` (filename only) to vocabulary or exercises in `lessons.ts`. The `LessonScreen` will automatically show a speaker icon and handle playback via `useAudio`.
- **Pedagogical Consistency**: Follow the rule of replacing 'P' with 'B' in educational content (e.g., "batata" instead of "pomme de terre").


### Verification
- Always test changes on both Android and iOS if possible.
- Ensure TypeScript types are strictly followed (avoid `any`).
- Add or update tests in `__tests__/` when modifying core logic.
