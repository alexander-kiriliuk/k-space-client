import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kspace.client",
  appName: "k-space-client",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      /*launchShowDuration: 1000,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#0087cf",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,*/
    },
  },
};

export default config;
