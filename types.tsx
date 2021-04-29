import {WoWItem} from "./interfaces/Item";
import {StackScreenProps} from "@react-navigation/stack";

export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type TabOneParamList = {
  SearchScreen: undefined;
  ItemScreen: { item: WoWItem, selectedRealm: string, selectedFaction: string };
  CreateAlarmScreen: { item: WoWItem, selectedRealm: string, selectedFaction: string };
};

export type MessagesTabParamList = {
  MessagesTabScreen: undefined;
};

export type ProfileTabParamList = {
  ProfileTabScreen: undefined;
};

export type SearchScreenProp = StackScreenProps<TabOneParamList, 'SearchScreen'>
export type ItemScreenProp = StackScreenProps<TabOneParamList, 'ItemScreen'>
export type CreateAlarmScreenProp = StackScreenProps<TabOneParamList, 'CreateAlarmScreen'>
