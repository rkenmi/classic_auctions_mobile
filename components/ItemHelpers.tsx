import {Image, ImageBackground, StyleProp, Text, View} from "react-native";
import {getColorCode} from "../util/search";
import React from "react";
import {WoWMoney} from "./WoWMoney";
import {WoWItem} from "../interfaces/Item";

export const socket = require('../assets/images/ico/tiny/socket-lg.png');

export const getItemStats = (item: any) => {
  const tooltip = item.tooltip;
  let hasSubtype: boolean = false;

  if (tooltip.length > 4) {
    hasSubtype = tooltip[4].format === 'alignRight';
  }

  let mainTooltipDone: boolean = false;


  const tt = tooltip.filter((line: any) => !line['label'].includes('Drop'));
  const tooltipDOM = tt.map((line: any, i: number) => {
    const {format} = line;
    let style: StyleProp<any> = {color: '#fff', fontSize: mainTooltipDone ? 12 : 15};

    if (hasSubtype && (i === 3 || i === 4)) {
      style['display'] = 'inline';
      if (i === 3) {
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={`tooltip-${item.id}-${i}`}>
            <Text style={{color: '#fff', justifyContent: 'flex-start'}}>{tt[i].label}</Text>
            <Text style={{color: '#fff', justifyContent: 'flex-end'}}>{tt[i+1].label}</Text>
          </View>
        )
      } else {
        return null;
      }
    } else if (format === 'indent') {
      style['marginLeft'] = 10;
    } else if (format === 'Uncommon' || format === 'Epic' || format === 'Misc' || format === 'Poor' || format === 'Rare') {
      style['color'] = getColorCode(format);
    } else if (line['label'].includes("Sell Price")) {
      mainTooltipDone = true;
      style['paddingBottom'] = i === (tt.length - 1) ? 0 : 20;
      // Sell by
      return <WoWMoney key={item.id.toString()} money={item.sellPrice}/>;
    } else if (line['label'].includes("Use:")) {
      style['color'] = getColorCode('Uncommon');
    }

    return (
      <Text style={style} key={`tooltip-${item.id}-${i}`}>{line['label']}</Text>
    )
  });

  return (
    <View style={{paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderWidth: 1, borderColor: 'rgb(204, 204, 204)', backgroundColor: '#212529'}}>
      {tooltipDOM}
    </View>
  )
}

export const getItemIcon = (item: WoWItem, imgHref: string) => {
  if (!item || !imgHref) {
    return null;
  }
  return (
      <ImageBackground source={{uri: imgHref}} style={{width: 75, height: 75}}>
        <Image source={socket} style={{bottom: 5, height: 85, width: 75}}/>
      </ImageBackground>
  )
};