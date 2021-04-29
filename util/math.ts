
export const getGoldValue = (money: number): number =>  {
  return Math.floor(money / 10000);
}
export const getSilverValue = (money: number): number =>  {
  return Math.floor((money / 100) % 100);
}

export const getCopperValue = (money: number): number =>  {
  return Math.floor(money % 100);
}
