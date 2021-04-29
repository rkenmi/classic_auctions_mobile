import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName, View, Text} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from "../screens/LoginScreen";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerState} from "../reducers/rootReducer";
import * as SecureStore from "expo-secure-store";
import {RESTORE_TOKEN, restoreToken, setFaction, setRealm} from "../actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const SplashScreen = () => {
  return <View><Text>Splash</Text></View>
}

function RootNavigator() {
  const state = useSelector((state: RootReducerState) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // This action sets the userToken state to undefined,
      // which will prompt the app to direct the user to login flow
      dispatch(restoreToken(userToken));

      // Restore selectedRealm and selectedFaction, if available
      try {
        const selectedRealm = await AsyncStorage.getItem('selectedRealm');
        const selectedFaction = await AsyncStorage.getItem('selectedFaction');
        if (selectedRealm !== null && selectedRealm !== 'N/A') {
          dispatch(setRealm(selectedRealm))
        }
        if (selectedFaction !== null && selectedFaction !== 'N/A') {
          dispatch(setFaction(selectedFaction))
        }
      } catch (err) {
        // Restoring realm/faction data failed
      }
    }

    bootstrapAsync();
  }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.userToken == null ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />
        </>
      ) : (
        // User is signed in
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </>
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
