import {Text} from "./Themed";
import {StyleProp, TextStyle, View} from "react-native";
import React from "react";

export const getLogoStyle: StyleProp<TextStyle> = {
  fontWeight: '400',
  fontFamily: 'raleway',
  fontSize: 63,
  color: '#f4f5f5',
}

export const getScreenTitleStyle: StyleProp<TextStyle> = {
  marginVertical: 16,
  fontWeight: '400',
  fontFamily: 'raleway',
  fontSize: 32,
  color: '#f4f5f5',
}

export const getScreenCategoryTitleStyle: StyleProp<TextStyle> = {
  fontWeight: '400',
  fontFamily: 'raleway',
  fontSize: 20,
  color: 'turquoise',
}

export const getLogo = (style: StyleProp<any> = {}) => {
  return (
    <Text
      lightColor="rgba(-1,0,0,0.8)"
      darkColor="rgba(254,255,255,0.8)"
      style={{
        fontWeight: '400',
        fontFamily: 'raleway',
        fontSize: style.fontSize || 63,
        color: '#f4f5f5',
      }}>Classic <Text style={{color: 'turquoise'}}>AH</Text></Text>
  )
}