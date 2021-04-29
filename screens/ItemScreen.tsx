import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import { Text, View } from '../components/Themed';
import {Overlay} from "react-native-elements";
import {useEffect, useState} from "react";
import {getItemIcon, getItemStats} from "../components/ItemHelpers";
import {BIG_ICON_ITEM_URL, getNHLink} from "../util/endpoints";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerState} from "../reducers/rootReducer";
import {loadPrices} from "../actions/thunks";
import {WoWMoney} from "../components/WoWMoney";
import moment from "moment";
import {VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryAxis, VictoryTooltip} from 'victory-native'
import { AntDesign } from '@expo/vector-icons';
import {getScreenCategoryTitleStyle, getScreenTitleStyle} from "../components/TextHelpers";
import {WoWItem} from "../interfaces/Item";
import {ItemScreenProp} from "../types";
import {tickYAxisFormatter} from "../util/graphs";

export default function ItemScreen({ route, navigation }: ItemScreenProp) {
  const [visible, setVisible] = useState(false);
  const { selectedRealm, selectedFaction, prices } = useSelector((state: RootReducerState) => state);
  const dispatch = useDispatch();

  const item: WoWItem = route.params.item;
  const imgHref: string = BIG_ICON_ITEM_URL + item.icon + '.jpg';
  const itemTooltipContainer = getItemStats(item)

  useEffect(() => {
    (async () => dispatch(loadPrices(item)))();
  }, [])

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Overlay
        overlayStyle={styles.overlayContainer}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View>{itemTooltipContainer}</View>
      </Overlay>
      <ScrollView style={styles.scrollContainer}>
        <View>
          <Text style={getScreenTitleStyle}>Item Details</Text>
        </View>
        <View style={styles.itemSection}>
          <View style={styles.itemSectionRow}>
            <TouchableOpacity onPress={toggleOverlay}>
              {getItemIcon(item, imgHref)}
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleOverlay}>
              <Text>Tap to view item</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.alarmSection}>
          <View style={styles.alarmLeftSubsection}>
            <Text style={getScreenCategoryTitleStyle}>Alarms</Text>
            <Text>None configured</Text>
          </View>
          <View style={styles.alarmRightSubsection}>
            <TouchableOpacity style={styles.alarmsTouchable} onPress={() => navigation.navigate('CreateAlarmScreen', {item, selectedRealm, selectedFaction})}>
              <AntDesign style={{marginRight: 5}} name="pluscircleo" size={32} color="white" />
              <Text>Add Alarms</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.recentPricesSection}>
          <Text style={getScreenCategoryTitleStyle}>Recent Prices</Text>
          {prices.slice(0, 5).map((price, i) => (
            <View style={styles.recentPricesRowSpacer} key={price.uniqueId} >
              <View style={styles.recentPricesRow}>
                <WoWMoney rKey={price.uniqueId} money={price.buyout}/>
                <Text>{moment(new Date(price.timestamp)).fromNow()}</Text>
              </View>
            </View>
          ))}
        </View>
        <View>
          <VictoryChart
            containerComponent={
              <VictoryVoronoiContainer
                labelComponent={<VictoryTooltip/>}
                labels={({datum}) => `${tickYAxisFormatter(datum.y)}, ${moment(new Date(datum.x)).format('MM/DD')}`}
              />
            }>
            <VictoryLine
              style={{ data: { stroke: "#c43a31" }, parent: { border: "1px solid #ccc"} }}
              scale={{x: 'time'}}
              data={prices.slice(0, 30).map((price, i) => {
                return {
                  x: new Date(price.timestamp),
                  y: price.buyout
                }
              })}>
            </VictoryLine>
            <VictoryAxis
              dependentAxis
              tickCount={3}
              scale={{y: 'linear'}}
              tickFormat={tickYAxisFormatter}
            />
            <VictoryAxis
              tickCount={3}
              scale={{y: 'time'}}
              tickFormat={(t) => `${moment(t).format('MM/DD/YY')}`}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  recentPricesRowSpacer: {
    marginVertical: 10
  },
  recentPricesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recentPricesSection: {
    marginVertical: 15
  },
  alarmSection: {
    marginVertical: 15,
    flexDirection: 'row'
  },
  alarmLeftSubsection: {
    flex: 0.5,
    justifyContent: 'center'
  },
  alarmRightSubsection: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  alarmsTouchable: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  itemSection: {
    marginTop: 15,
    flexDirection: 'row'
  },
  itemSectionRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContainer: {
    width: '90%'
  },
  overlayContainer: {
    backgroundColor: 'transparent'
  }
});
