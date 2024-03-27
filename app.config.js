// app.config.js

module.exports = {
    expo: {
      name: 'DailyTick',
      slug: 'DailyTick',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/icon.png',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
      },
      updates: {
        fallbackToCacheTimeout: 0
      },
      ios: {
        bundleIdentifier: 'com.ohorizon.DailyTick',
        supportsTablet: true
      },
      android: {
        package: 'com.ohorizon.DailyTick',
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#ffffff'
        }
      },
      "extra": {
        "eas": {
          "projectId": "6d9fd203-e901-4eec-81d1-6a4d5d2b3f3d"
        }
      },
      plugins: [
        "./plugins/custom-android-styles.js",
      ]
    }
  };
  