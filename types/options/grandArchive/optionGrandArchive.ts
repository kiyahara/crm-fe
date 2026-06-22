export interface SelectClassGAInterface {
  text: string;
  value: string;
  display?: string;
}
export interface GrandArchiveFilterOptionsInterace {
  class: SelectClassGAInterface[];
  element: SelectClassGAInterface[];
  rarity: SelectClassGAInterface[];
  set: SelectClassGAInterface[];
  gameFormat: SelectClassGAInterface[];
}
