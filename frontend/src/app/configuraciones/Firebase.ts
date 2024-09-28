import { getMessaging } from 'firebase/messaging';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { runEmulators } from './Emulators';

const credenciales = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
};

const app = initializeApp(credenciales);
const auth = getAuth(app);
const messaging = getMessaging(app);
const db = getDatabase();

if (import.meta.env.DEV) runEmulators({ auth });

if (import.meta.env.PROD) {
  getAnalytics(app);
}

export { auth, db, messaging };
