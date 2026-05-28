# DarijaQuest Monorepo - Project Instructions

This repository contains both the mobile application and its custom backend infrastructure for DarijaQuest, a Moroccan Darija learning platform.

## 📁 Repository Structure

- **`/mobile`**: React Native mobile application (Android/iOS).
- **`/backend`**: Node.js/Express API and infrastructure (PostgreSQL, MinIO, Docker).

---

## ☁️ Backend Infrastructure (`/backend`)

### Tech Stack
- **API**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 15 (Docker)
- **Object Storage**: MinIO (S3 compatible, for audio/images)
- **Auth**: JWT based with bcrypt encryption
- **Notifications**: Firebase Admin SDK

### Setup & Commands
1. **Docker**: `docker-compose up -d` (Launches Postgres, MinIO, and pgAdmin)
2. **Install**: `npm install`
3. **Start API**: `npm run dev` (API runs at `http://localhost:3000`)
4. **MinIO Admin**: `http://localhost:9001` (Admin: `darija_minio_admin` / `darija_minio_password`)
5. **Upload Audio**: `npm run upload:audio -- /path/to/file.mp3`
6. **Test Notification**: `npm run notify` (Requires `serviceAccountKey.json`)

---

## 📱 Mobile Application (`/mobile`)

### Tech Stack
- **Framework**: React Native 0.85.3 + TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Native Stack)
- **Notifications**: `@react-native-firebase/messaging`
- **Audio**: `react-native-video` (connected to local MinIO)
- **Storage**: AsyncStorage (Local persistence + Guest Mode)

### Development Workflow
1. **API Connection**: The app connects to `http://localhost:3000/api`.
2. **Physical Device**: To test on a real Android phone:
   - Run `adb reverse tcp:3000 tcp:3000`
   - Run `adb reverse tcp:9000 tcp:9000` (for MinIO audio)
3. **Commands**:
   - `npm start` (Metro)
   - `npm run android`
   - `npm run ios` (Requires Mac/Xcode)

---

## 📏 Engineering Standards

### Styling & UI
- **No Tailwind**: Use `StyleSheet.create` for all styles.
- **Safe Areas**: Always wrap screen content in `SafeAreaView`.
- **Atomic Components**: Use/extend components in `src/components/ui/`.

### Data & State
- **Custom Hooks**: Use `useAuth` (JWT), `useUserData` (Profile/XP), and `useAudio` (MinIO URLs).
- **Pedagogical Rule**: Replace 'P' with 'B' in content (e.g., "batata").
- **Auth**: Tokens are stored in AsyncStorage and sent in `Authorization` headers.

### Testing
- **Backend**: Test endpoints via `curl` or Postman.
- **Mobile**: Test on Android physical device.
- **Notifications**: Ensure `google-services.json` (Android) is in `mobile/android/app/`.
