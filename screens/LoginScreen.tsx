import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import {SocialIcon} from 'react-native-elements';
import {Text} from "../components/Themed";
import {fbSignIn, googleSignIn} from "../util/signIn";
import {useDispatch} from "react-redux";
import {setUserProfile, signIn} from "../actions/actions";
import * as SecureStore from 'expo-secure-store';
import {getLogo, getLogoStyle} from "../components/TextHelpers";

// Colors
export const WHITE = '#ffffff';

export default function LoginScreen() {
  const dispatch = useDispatch();

  const login = (signInCallback: () => any) => async () => {
    try {
      const result = await signInCallback();
      await SecureStore.setItemAsync('userToken', result.idToken);
      dispatch(signIn(result.idToken));
      dispatch(setUserProfile(result.currentUser.id, result.currentUser.name))
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.titleSection}>
        {getLogo()}
      </View>
      <View style={styles.signInSection}>
        <SocialIcon
          title={"Sign In With Google"}
          button={true}
          onPress={login(googleSignIn)}
          type={"google"}
        />
        <SocialIcon
          title={"Sign In With Facebook"}
          button={true}
          onPress={login(fbSignIn)}
          type={"facebook"}
        />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 100
  },
  titleSection: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  signInSection: {
    flex: 1,
    justifyContent: 'center'
  }
});

