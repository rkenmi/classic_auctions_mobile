import {View, Text, Image, StyleSheet, ImageBackground} from "react-native";
import React from "react";

export const goldIcon = require('../assets/images/ico/tiny/money_gold.gif');
export const silverIcon = require('../assets/images/ico/tiny/money_silver.gif');
export const copperIcon = require('../assets/images/ico/tiny/money_copper.gif');

export function WoWMoney({text = '', money, rKey = undefined}) {
  // For items with no buyout price
  if (money === '0' || money === 0) {
    return <View style={{borderWidth: 0}}/>;
  }

  let keyProps: any = {};
  if (rKey) {
    keyProps.key = `${rKey}-item`
  }

  return (
    <View {...keyProps} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        {money > 9999 ?
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#fff'}}>{Math.floor((money / 10000))}</Text>
            <Image style={styles.money} source={goldIcon}/>
          </View>
          : null}
        {money > 99 ?
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#fff'}}>{Math.floor((money / 100) % 100)}</Text>
            <Image style={styles.money} source={silverIcon}/>
          </View>
          : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#fff'}}>{Math.floor(money % 100)}</Text>
          <Image style={styles.money} source={copperIcon}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  money: {
    paddingRight: 15,
    paddingLeft: 0,
    margin: 1,
    width: 10,
    height: 12,
  },
});

