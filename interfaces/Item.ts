export interface WoWItem {
  id: number
  name: string
  classType: string
  subclassType?: string
  contentPhase?: number
  icon: string // ex: "inv_staff_29"
  itemLvl?: number
  maxStack?: number
  minLvlRequired?: number
  quality?: string // ex: "Rare"
  sellPrice?: number
  slot?: string
  class: any
  tooltip: any
  source?: any
}