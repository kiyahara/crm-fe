export interface DetailCardGrandArchive {
  classes: string[];
  cost_memory: number;
  dataGroup: DataGroupGAInterface[];
  addedCard: number;
  cost_reserve: number | null;
  cost: CostGrandArchiveInterface;
  created_at: Date;
  durability: number | null;
  editions: EditionGA[];
  effect: string;
  effect_html: string;
  effect_raw: string;
  element: string;
  elements: string[];
  flavor: string;
  last_update: Date;
  groupId: string;
  legality: LegalityItemGA;
  level: number | null;
  life: number | null;
  name: string;
  power: number;
  result_editions: EditionGA[];
  slug: string;
  speed: string | null;
  subtypes: string[];
  types: string[];
  uuid: string;
}
export interface DataGroupGAInterface {
  groupId: number;
  name: string;
  abbreviation: string;
  isSupplemental: false;
  publishedOn: Date;
  modifiedOn: Date;
  categoryId: number;
}
export interface CostGrandArchiveInterface {
  type: string;
  value: string;
}
export interface EditionGA {
  card_id: string;
  dataGroup?: DataGroupGAInterface;
  collector_number: string;
  configuration: string;
  created_at: Date;
  effect: string | null;
  effect_raw: string | null;
  flavor: string | null;
  illustrator: string;
  image: string;
  last_update: Date;
  orientation: null;
  rarity: number;
  slug: string;
  thema_charm_foil: number | null;
  thema_charm_nonfoil: number | null;
  thema_ferocity_foil: number | null;
  thema_ferocity_nonfoil: number | null;
  thema_foil: number | null;
  thema_grace_foil: number | null;
  thema_grace_nonfoil: number | null;
  thema_mystique_foil: number | null;
  thema_mystique_nonfoil: number | null;
  thema_nonfoil: number | null;
  thema_valor_foil: number | null;
  thema_valor_nonfoil: number | null;
  thema_foil_dynamic: boolean;
  thema_nonfoil_dynamic: boolean;
  uuid: string;
  collaborators: string[];
  circulations: CirculationGA[];
  other_orientations: DetailOtherOrientationCardGrandArchive[];
  set: SetsGA;
  effect_html: string | null;
}
export interface LegalityItemGA {
  limit: number;
}
