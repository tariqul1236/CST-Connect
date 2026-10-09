import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cstconnect.app',
  appName: 'CST Connect',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
