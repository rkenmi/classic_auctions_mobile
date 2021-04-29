import {AnyAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {WoWItem} from "../interfaces/Item";
import {getNHLink} from "../util/endpoints";
import {setFaction, setPrices, setRealm, signOut} from "./actions";

export type ReduxThunkAction<ReturnType = any> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const logout = (): ReduxThunkAction => async dispatch => {
  await SecureStore.deleteItemAsync('userToken');
  dispatch(signOut())
}

export const saveRealm = (selectedRealm: string): ReduxThunkAction => async dispatch => {
  await AsyncStorage.setItem('selectedRealm', selectedRealm)
  dispatch(setRealm(selectedRealm))
}

export const saveFaction = (selectedFaction: string): ReduxThunkAction => async dispatch => {
  await AsyncStorage.setItem('selectedFaction', selectedFaction)
  dispatch(setFaction(selectedFaction))
}

export const loadPrices = (item: WoWItem): ReduxThunkAction => async (dispatch, getState) => {
  const {selectedFaction, selectedRealm} = getState();

  const searchUrl = await getNHLink(selectedRealm, selectedFaction, item.id);
  const search = await fetch(searchUrl);
  const searchResponse = await search.json();

  const prices = searchResponse.data;
  if (!prices) {
    return;
  }
  const latestItemStats: object[] = prices.map((i: any) => {return {
    buyout: i.minBuyout,
    timestamp: i.scannedAt,
    metaItem: item,
    id: item.id,
    uniqueId: `${i.minBuyout}${i.scannedAt}${item.id}_${Date.now()}` // unique id for this particular row. used for React keys
  }}).reverse();
  dispatch(setPrices(latestItemStats))
}
