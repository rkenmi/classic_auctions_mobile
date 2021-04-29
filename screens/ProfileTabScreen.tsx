import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import { Text, View } from '../components/Themed';
import * as AuthSession from 'expo-auth-session';
import {useDispatch, useSelector} from "react-redux";
import {SIGN_OUT, signOut} from "../actions/actions";
import {RootReducerState} from "../reducers/rootReducer";
import {AppDispatch} from "../store";
import {useAppDispatch} from "../hooks/useReduxHooks";
import {logout} from "../actions/thunks";
export default function ProfileTabScreen() {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useSelector((state: RootReducerState) => state);

  return (
    <View style={styles.container}>
      <Text>{state.id}</Text>
      <Text>{state.name}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={() => {
        dispatch(logout())
      }}>
        <Text style={{fontSize: 24}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
