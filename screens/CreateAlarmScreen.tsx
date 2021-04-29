import * as React from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Switch, TextInput} from 'react-native';

import {Text, View} from '../components/Themed';
import {useSelector} from "react-redux";
import {RootReducerState} from "../reducers/rootReducer";
import {copperIcon, goldIcon, silverIcon, WoWMoney} from "../components/WoWMoney";
import {RadioButton} from "react-native-paper";
import Slider from "@react-native-community/slider";
import {getScreenCategoryTitleStyle, getScreenTitleStyle} from "../components/TextHelpers";
import {AlarmPriceComparator, MAX_CURRENCY_VALUE_ALARM} from "../util/constants";
import {CreateAlarmScreenProp} from "../types";
import {getCopperValue, getGoldValue, getSilverValue} from "../util/math";

type SliderBoxValues = {
  gold: number
  silver: number
  copper: number
}

const updateGold = (sliderValue: number, sliderBoxValue: SliderBoxValues, setSliderValue: (num: number) => void) => {
  const oldSilverAndCopper = sliderValue % 10000;
  const newGold = sliderBoxValue.gold * 10000;
  const updatedPrice = oldSilverAndCopper + newGold;
  setSliderValue(updatedPrice);
}

const updateSilver = (sliderValue: number, sliderBoxValue: SliderBoxValues, setSliderValue: (num: number) => void) => {
  const oldCopper = sliderValue % 100;
  const oldGold = Math.floor(sliderValue / 10000) * 10000;
  const newSilver = sliderBoxValue.silver * 100;
  const updatedPrice = oldGold + newSilver + oldCopper;
  setSliderValue(updatedPrice);
}

const updateCopper = (sliderValue: number, sliderBoxValue: SliderBoxValues, setSliderValue: (num: number) => void) => {
  const oldGoldAndSilver = Math.floor(sliderValue / 100) * 100;
  const newCopper = sliderBoxValue.copper;
  const updatedPrice = oldGoldAndSilver + newCopper;
  setSliderValue(updatedPrice);
}

export default function CreateAlarmScreen({ route, navigation }: CreateAlarmScreenProp ) {
  const item = route.params.item;
  const [alarmState, setAlarmState] = useState({timestamp: null, fireOnce: true, comparator: AlarmPriceComparator.LT})
  const { prices } = useSelector((state: RootReducerState) => state);
  const itemPrice = prices.length > 0 ? prices[0].buyout : item.sellPrice
  const [sliderValue, setSliderValue] = useState(itemPrice);
  const [sliderBoxValue, setSliderBoxValue] = useState({
    gold: Math.floor(itemPrice / 10000),
    silver: Math.floor((itemPrice / 100) % 100),
    copper: Math.floor(itemPrice % 100)
  });

  const buyouts: number[] = prices.map(price => price.buyout);
  const lowestBuyout: number = buyouts.length > 0 ? Math.min(...buyouts) : 0;

  return (
    <View style={styles.container}>
      <View style={{width: '90%'}}>
        <Text style={getScreenTitleStyle}>Create Alarm</Text>
      </View>
      <View style={{width: '90%', justifyContent: 'center'}}>
        <View style={{marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={getScreenCategoryTitleStyle}>Price</Text>
          <WoWMoney money={sliderValue}/>
        </View>
        <Slider
          style={styles.slider}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#aaa"
          thumbTintColor={'#fff'}
          value={sliderValue}
          onValueChange={(value) => {
            setSliderValue(value)
            setSliderBoxValue(state => ({
              ...state,
              gold: getGoldValue(value),
              silver: getSilverValue(value),
              copper: getCopperValue(value),
            }))
          }}
          minimumValue={Math.round(lowestBuyout / 25) || Math.round(item.sellPrice / 25) + 1} // guarantee 1 minimum
          maximumValue={MAX_CURRENCY_VALUE_ALARM}
          step={1}
        />
        <View style={styles.sliderInputBoxSelections}>
          <TextInput
            placeholder={'Gold'}
            value={sliderBoxValue.gold.toString()}
            autoCompleteType={'off'}
            maxLength={4}
            keyboardType={'numeric'}
            textContentType={'oneTimeCode'}
            onChangeText={text => setSliderBoxValue(state => ({...state, gold: parseInt(text) || 0}))}
            onEndEditing={event => updateGold(sliderValue, sliderBoxValue, setSliderValue)}
            style={styles.sliderInputBox}
          />
          <Image style={styles.money} source={goldIcon}/>
          <TextInput
            placeholder={'Silver'}
            value={sliderBoxValue.silver.toString()}
            autoCompleteType={'off'}
            maxLength={2}
            keyboardType={'numeric'}
            onChangeText={text => setSliderBoxValue(state => ({...state, silver: parseInt(text) || 0}))}
            onEndEditing={event => updateSilver(sliderValue, sliderBoxValue, setSliderValue)}
            style={styles.sliderInputBox}
          />
          <Image style={styles.money} source={silverIcon}/>
          <TextInput
            placeholder={'Copper'}
            value={sliderBoxValue.copper.toString()}
            autoCompleteType={'off'}
            maxLength={2}
            keyboardType={'numeric'}
            onChangeText={text => setSliderBoxValue(state => ({...state, copper: parseInt(text) || 0}))}
            onEndEditing={event => updateCopper(sliderValue, sliderBoxValue, setSliderValue)}
            style={styles.sliderInputBox}
          />
          <Image style={styles.money} source={copperIcon}/>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.alarmConditionSection}>
          <Text style={getScreenCategoryTitleStyle}>Alarm when price is</Text>
          <View style={{justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                <View style={styles.alarmConditionRadioButton}>
                  <RadioButton
                    value={AlarmPriceComparator.LT.toString()}
                    status={ alarmState.comparator === AlarmPriceComparator.LT ? 'checked' : 'unchecked' }
                    onPress={() => setAlarmState(state => ({...state, comparator: AlarmPriceComparator.LT}))}
                  />
                </View>
                <Text>Less than</Text>
                <View style={styles.alarmConditionRadioButton}>
                  <RadioButton
                    uncheckedColor={'white'}
                    color={'white'}
                    value={AlarmPriceComparator.GT.toString()}
                    status={ alarmState.comparator === AlarmPriceComparator.GT ? 'checked' : 'unchecked'}
                    onPress={() => setAlarmState(state => ({...state, comparator: AlarmPriceComparator.GT}))}
                  />
                </View>
                <Text>Greater than</Text>
            </View>
          </View>
        </View>

        <View style={styles.alarmFireOnceSection}>
          <Text style={getScreenCategoryTitleStyle}>Alarm once</Text>
          <Switch
            style={{height: 30}}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setAlarmState(state => ({...state, fireOnce: !state.fireOnce}))}
            value={alarmState.fireOnce}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'left',
  },
  money: {
    paddingRight: 15,
    paddingLeft: 0,
    width: 15,
    height: 15,
  },
  sectionHeader: {
    color: '#aaa',
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  titleSection: {
    width: '90%'
  },
  slider: {
    height: 100,
    backgroundColor: 'transparent'
  },
  sliderInputBox: {
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
    backgroundColor: '#aaa'
  },
  sliderInputBoxSelections: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alarmConditionSection: {
    marginVertical: 10
  },
  alarmConditionRadioButton: {
    margin: 15,
    backgroundColor: '#3a3a3a',
    borderRadius: 15
  },
  alarmFireOnceSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10
  }
});
