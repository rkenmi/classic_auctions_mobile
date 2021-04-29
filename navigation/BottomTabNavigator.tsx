import {AntDesign, Ionicons} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator, Header, HeaderBackButton, HeaderTitle} from '@react-navigation/stack';
import * as React from 'react';
import {StyleSheet} from "react-native";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SearchScreen from '../screens/SearchScreen';
import AlarmsScreen from '../screens/AlarmsScreen';
import {BottomTabParamList, ProfileTabParamList, TabOneParamList, MessagesTabParamList} from '../types';
import ProfileTabScreen from "../screens/ProfileTabScreen";
import ItemScreen from "../screens/ItemScreen";
import {View, Text} from "react-native";
import {getColorCode} from "../util/search";
import CreateAlarmScreen from "../screens/CreateAlarmScreen";
import {SearchBar} from "react-native-elements";
import {useState} from "react";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Search"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Alarms"
        component={MessagesTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="notifications" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabNavigator}
        options={{
            tabBarIcon: ({ color }) => <ProfileIcon />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function MessagesIcon() {
  return <AntDesign name='message1' size={24} color='black'/>;
}

function ProfileIcon() {
  return <AntDesign name='profile' size={24} color='black'/>;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

const placeholder = {
  label: 'Realm',
  value: null,
  color: '#9EA0A4',
};
function TabOneNavigator() {
  const [query, setQuery] = useState('');
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({ route }) => ({
          headerStyle: {height: 200},
          headerShown: false,
          headerTitle: (
            <View style={{flex: 1}}>
              <View style={{ width: '100%', borderWidth: 0, borderRadius: 10, overflow: 'hidden'}}>
                <SearchBar
                  value={query}
                  onChangeText={setQuery}
                  platform={'default'}
                  placeholder={'Search for an item'}
                  searchIcon={{ size: 24 }}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, width: 150}}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Realm',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    style={pickerSelectStyles}
                    onValueChange={(value) => console.log(value)}
                    items={[{label: 'foo', value: 'bar'}]}
                  />
                </View>
                <View style={{flex: 1, width: 150}}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Faction',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    style={pickerSelectStyles}
                    onValueChange={(value) => console.log(value)}
                    items={[{label: 'foo', value: 'bar'}]}
                  />
                </View>
              </View>
            </View>
          )
        })}
      />
      <TabOneStack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={({ route }) => ({
          title: route.params.item.name,
          headerTitle: (
            <View>
              <Text style={{color: getColorCode(route.params.item.quality), fontSize: 20}}>{route.params.item.name}</Text>
              <Text style={{color: getColorCode('Misc')}}>{route.params.selectedRealm} - {route.params.selectedFaction}</Text>
            </View>
          )
        })}
      />
      <TabOneStack.Screen
        name="CreateAlarmScreen"
        component={CreateAlarmScreen}
        options={({ route }) => ({
          title: 'Create Alarm',
          headerTitle: (
            <View>
              <Text style={{color: getColorCode(route.params.item.quality), fontSize: 20}}>{route.params.item.name}</Text>
              <Text style={{color: getColorCode('Misc')}}>{route.params.selectedRealm} - {route.params.selectedFaction}</Text>
            </View>
          )
        })}
      />
    </TabOneStack.Navigator>
  );
}

const MessagesTabStack = createStackNavigator<MessagesTabParamList>();

function MessagesTabNavigator() {
  return (
    <MessagesTabStack.Navigator>
      <MessagesTabStack.Screen
        name="MessagesTabScreen"
        component={AlarmsScreen}
        options={{ headerTitle: 'Alarms' }}
      />
    </MessagesTabStack.Navigator>
  );
}
const ProfileStack = createStackNavigator<ProfileTabParamList>();

function ProfileTabNavigator() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="ProfileTabScreen"
                component={ProfileTabScreen}
                options={{ headerTitle: 'Profile' }}
            />
        </ProfileStack.Navigator>
    );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});