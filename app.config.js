export default {
    "expo": {
        "name": "ClassicAHDemo",
        "slug": "ClassicAHDemo",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "classic-ah-demo",
        "userInterfaceStyle": "automatic",
        "splash": {
            "image": "./assets/images/scroll.png",
            "resizeMode": "contain",
            "backgroundColor": "#000000"
        },
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        "ios": {
            "supportsTablet": true
        },
        "facebookScheme": "yourAppScheme",
        "facebookAppId": "yourAppId",
        "facebookDisplayName": "yourAppDisplayName",
        "android": {
            "package": "yourAndroidAppPackage",
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#FFFFFF"
            }
        },
        "extra": {
            CLASSIC_AH_USER_SERVICE_URL: 'http://169.254.131.3:3000/dev',
            FB_APP_ID: 'YOUR_APP_ID',
            GOOG_CLIENT_ID: 'YOUR_CLIENT_ID',
            GOOG_CLIENT_SECRET: 'YOUR_CLIENT_SECRET',
            GOOG_OAUTH_IOS_CLIENT_ID: 'YOUR_IOS_CLIENT_ID',
            GOOG_OAUTH_ANDROID_CLIENT_ID: 'YOUR_ANDROID_CLIENT_ID',
        },
        "web": {
            "favicon": "./assets/images/favicon.png"
        }
    }
};
