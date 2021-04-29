import * as React from 'react';
import {Alert, FlatList, Image, Keyboard, Platform, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';

import { Text, View } from '../components/Themed';
import { SearchBar} from "react-native-elements";
import {useEffect, useState} from "react";
import {getColorCode, queryItemFilter} from "../util/search";
import {useSelector} from "react-redux";
import {saveRealm, saveFaction} from "../actions/thunks";
import {TINY_ICON_URL} from "../util/endpoints";
import {RootReducerState} from "../reducers/rootReducer";
import {realms} from "../util/realms";
import RNPickerSelect from "react-native-picker-select";
import {getScreenTitleStyle} from "../components/TextHelpers";
import {AppDispatch} from "../store";
import {useAppDispatch} from "../hooks/useReduxHooks";
import {SearchScreenProp} from "../types";
const items = require('../assets/json/item-db.json')

const realmPickerDefaultSelection: object = {
  label: 'Select Realm',
  value: 'N/A',
  color: '#9EA0A4',
}

const factionPickerDefaultSelection: object = {
  label: 'Select Faction',
  value: 'N/A',
  color: '#8EA0A4',
}

export default function SearchScreen({ navigation }: SearchScreenProp) {
  const [query, setQuery] = useState('');
  const selectedRealm = useSelector((state: RootReducerState) => state.selectedRealm);
  const selectedFaction = useSelector((state: RootReducerState) => state.selectedFaction);
  const dispatch: AppDispatch = useAppDispatch();

  const showSearchResults = () => {
    if (selectedFaction === 'N/A' || selectedRealm === 'N/A') {
      return;
    }
    return (
      <FlatList
        style={{backgroundColor: 'transparent'}}
        extraData={query}
        data={queryItemFilter(items, query)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) =>
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemScreen', {
              item, selectedRealm, selectedFaction
            })}
            style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', padding: 10}}>
            <Image
              source={{uri: `${TINY_ICON_URL}${item.icon}.png`}}
              style={{width: 40, height: 40, marginRight: 10}}/>
            <View>
              <Text style={{color: getColorCode(item.quality), ...styles.getStartedText}}>{item.name}</Text>
              <Text style={{color: getColorCode('Misc'), fontSize: 12}}>
                {item.classType}
              </Text>
            </View>
          </TouchableOpacity>
        }
      />)
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.titleSection}>
        <Text style={getScreenTitleStyle}>Browse</Text>
      </View>
      <View style={styles.realmFactionSection}>
        <View style={styles.realmFactionSectionRow}>
          <View style={styles.realmFactionPickerBox}>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={realmPickerDefaultSelection}
              value={selectedRealm}
              onValueChange={(itemValue, itemIndex) => dispatch(saveRealm(itemValue))}
              items={realms['US_WEST'].map((realmName, i) => ({
                label: realmName,
                value: realmName,
              }))}
            />
          </View>
          <View style={styles.realmFactionPickerBox}>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={factionPickerDefaultSelection}
              value={selectedFaction}
              onValueChange={(itemValue, itemIndex) => dispatch(saveFaction(itemValue))}
              items={[{label: 'Alliance', value: 'Alliance'}, {label: 'Horde', value: 'Horde'}]}
            />
          </View>
        </View>
      </View>
      <View style={styles.searchSection}>
        <SearchBar
          onFocus={() => {
            if (selectedRealm === 'N/A' || selectedFaction === 'N/A') {
              Keyboard.dismiss()
              Alert.alert('Please select a realm and faction first!')
            }
          }}
          containerStyle={styles.searchBox}
          value={query}
          onChangeText={setQuery}
          platform={'default'}
          placeholder={'Search for an item'}/>
      </View>
      <View style={styles.searchResultsSection}>{showSearchResults()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
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
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'left',
  },
  realmFactionPickerBox: {
      width: '49%', borderWidth: 1, overflow: 'hidden',
      ...Platform.select({
          ios: {
              borderRadius: 0,
          },
          android: {
              borderRadius: 10,
          }
      })
  },
  titleSection: {
    width: '90%'
  },
  realmFactionSection: {
    marginVertical: 5,
    width: '90%'
  },
  realmFactionSectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchBox: {
    margin: 0,
    padding: 0
  },
  searchSection: {
    borderWidth: 1,
    marginBottom: 15,
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden'
  },
  searchResultsSection: {
    width: '90%',
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: '#212529',
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    backgroundColor: '#212529',
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
