export const TINY_ICON_URL = 'https://d2b9gcya89vi12.cloudfront.net/ico/tiny/';
export const BIG_ICON_ITEM_URL = 'https://render-classic-us.worldofwarcraft.com/icons/56/';

export const getNHLink = (realm: string, faction: string, itemId: number) => {
  let fixedRealm = realm;
  if (realm.includes(' ')) {
    fixedRealm = realm.replace(' ', '-');
  }

  return `https://api.nexushub.co/wow-classic/v1/items/${fixedRealm.toLowerCase()}-${faction.toLowerCase()}/${itemId}/prices?timerange=30`
}