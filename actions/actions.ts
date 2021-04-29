import {PayloadAction} from "@reduxjs/toolkit";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_ALARMS = 'SET_ALARMS';
export const SET_REALM = 'SET_REALM';
export const SET_FACTION = 'SET_FACTION';
export const SET_PRICES = 'SET_PRICES';

export function signIn(userToken: string): PayloadAction<object> {
  return {
    type: SIGN_IN,
    payload: {
      userToken
    },
  };
}

export function restoreToken(userToken: string | null | undefined): PayloadAction<object> {
  return {
    type: RESTORE_TOKEN,
    payload: {
      userToken
    },
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function setUserProfile(id: string, name: string): PayloadAction<object> {
  return {
    type: SET_USER_PROFILE,
    payload: {
      id,
      name,
    },
  };
}

export function setAlarms(alarms: string[]): PayloadAction<string[]> {
  return {
    type: SET_ALARMS,
    payload: alarms
  };
}
export function setRealm(realm: string): PayloadAction<string> {
  return {
    type: SET_REALM,
    payload: realm,
  };
}
export function setFaction(faction: string): PayloadAction<string> {
  return {
    type: SET_FACTION,
    payload: faction
  };
}

export function setPrices(prices: any[]): PayloadAction<object[]> {
  return {
    type: SET_PRICES,
    payload: prices
  };
}
