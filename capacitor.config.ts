import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'veromoneyApp',
  webDir: 'www',
  plugins: {
    StatusBar: {
      backgroundColor: "#ffffff",
      style: "DARK",
      overlaysWebView: false
    }
  }
};

export default config;
