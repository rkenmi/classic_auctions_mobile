import {WoWItem} from "../interfaces/Item";

export const getColorCode = (quality: string): string => {
  switch(quality) {
    case 'Misc': {
      return '#ffd100';
    }
    case 'Poor': {
      return '#9d9d9d';
    }
    case 'Common': {
      return '#ffffff';
    }
    case 'Uncommon': {
      return '#1eff00';
    }
    case 'Rare': {
      return '#0070dd';
    }
    case 'Epic': {
      return '#a335ee';
    }
    case 'Legendary': {
      return '#ff8000';
    }
    default: {
      return '#ffffff';
    }
  }
};

export const queryItemFilter = (items: WoWItem[], query: string): WoWItem[] => {
  return items.filter(item => {
    if (query === '') {
      return false
    } else {
      const normalizedQuery = query.toLowerCase();
      return item.name.toLowerCase().includes(normalizedQuery);
    }
  }).slice(0, 100);
}

