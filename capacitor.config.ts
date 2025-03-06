import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.dohadictionary.app',
  appName: 'معجم الدوحة التاريخي',
  webDir: 'dist/browser',
  server: {
    cleartext: true, // ✅ Allow HTTP (useful for debugging)
    allowNavigation: ['*'],
    androidScheme: "https"
  },
  android: {
    allowMixedContent: true, // ✅ Fix asset path issues in Android
  },
  ios: {
    contentInset: 'always',
  },
  plugins: {
  }
};

export default config;
