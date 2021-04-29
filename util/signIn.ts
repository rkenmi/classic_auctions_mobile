import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";
import {LogInResult} from "expo-google-app-auth";

export class AuthenticationError extends Error {}

export async function googleSignIn() {
    const loginResult: LogInResult = await Google.logInAsync({
        iosClientId: Constants.manifest.extra.GOOG_OAUTH_IOS_CLIENT_ID,
        iosStandaloneAppClientId: Constants.manifest.extra.GOOG_OAUTH_IOS_CLIENT_ID,
        androidClientId: Constants.manifest.extra.GOOG_OAUTH_ANDROID_CLIENT_ID,
        androidStandaloneAppClientId: Constants.manifest.extra.GOOG_OAUTH_ANDROID_CLIENT_ID,
        scopes: ['profile', 'email', 'openid']
    }).then((result: LogInResult) => {
        if (result.type === 'cancel') {
            throw new AuthenticationError('Login canceled');
        }
        return result;
    }, (err) => {
        throw new AuthenticationError(err.message);
    });
    const { type, idToken } = loginResult;

    if (type === 'success') {
        const result = await fetch(`${Constants.manifest.extra.CLASSIC_AH_USER_SERVICE_URL}/users/login`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${idToken}` }
        })

        return {...await result.json(), idToken};
    }
}

// Dummy login for Facebook
export async function fbSignIn() {
  return {
      idToken: 'foo',
      currentUser: {
          id: 'bar',
          name: 'baz'
      }
  }
}


