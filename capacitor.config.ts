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
    SplashScreen: {
      launchShowDuration: 3000, // Show for 3 seconds
      launchAutoHide: true, // Auto-hide after duration
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      backgroundColor: '#ffffff',
    },
  }
};

export default config;
