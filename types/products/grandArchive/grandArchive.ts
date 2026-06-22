export interface ResponseGrandArchive {
  data: DetailCardGrandArchive[];
  has_more: number;
  order: string;
  page: number;
  page_size: number;
  paginated_cards_count: number;
  sort: string;
  total_cards: number;
  total_pages: number;
}

export interface CostGrandArchiveInterface {
  type: string;
  value: string;
}
export interface LegalityItemGA {
  limit: number;
}

export interface LegalityGA {
  [key: string]: LegalityItemGA;
}

export interface SetsGA {
  created_at: Date;
  id: string;
  language: string;
  last_update: Date;
  name: string;
  prefix: string;
  release_date: Date;
}

export interface CirculationGA {
  created_at: Date;
  edition_id: string;
  foil: boolean;
  kind: string;
  last_update: Date;
  population: number;
  population_operator: string;
  printing: boolean;
  uuid: string;
  variants: string[];
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
  // circulationTemplates: [
  //   {
  //     created_at: "2025-11-24T09:52:36.684+00:00";
  //     edition_id: "Ac3EbjY4fI";
  //     foil: true;
  //     kind: "FOIL";
  //     last_update: "2025-11-24T09:52:36.684+00:00";
  //     name: "PTM U Foil";
  //     population: 1100;
  //     population_operator: "≈";
  //     printing: true;
  //     uuid: "ELqen2ZIse";
  //     variants: [
  //       {
  //         uuid: "51os2tOp8Q";
  //         edition_id: "Ac3EbjY4fI";
  //         description: "Fractured Curio Foil";
  //         image: "/cards/images/Ac3EbjY4fI.jpg";
  //         population_operator: "≈";
  //         population: 100;
  //         printing: false;
  //         kind: "FOIL";
  //         created_at: "2025-11-24T09:52:36.684+00:00";
  //         last_update: "2025-11-24T09:52:36.684+00:00";
  //       },
  //     ];
  //   },
  // ];
  circulations: CirculationGA[];
  other_orientations: DetailOtherOrientationCardGrandArchive[];
  set: SetsGA;
  effect_html: string | null;
}

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

export interface DetailOtherOrientationCardGrandArchive {
  classes: string[];
  cost_memory: number | null;
  cost_reserve: number | null;
  cost: CostGrandArchiveInterface;
  created_at: Date;
  durability: number | null;
  effect: string;
  effect_raw: string;
  element: string;
  elements: string[];
  flavor: string | null;
  last_update: Date;
  level: string | null;
  life: number;
  name: string;
  power: number;
  speed: number | null;
  subtypes: string[];
  types: string[];
  uuid: string;
  edition_id: string;
  edition: {
    set: {
      id: string;
      name: string;
      prefix: string;
      language: string;
      created_at: string;
      last_update: string;
      release_date: string;
    };
    slug: string;
    uuid: string;
    image: string;
    effect: string;
    flavor: string | null;
    rarity: number;
    card_id: string;
    created_at: Date;
    effect_raw: string;
    illustrator: string;
    last_update: Date;
    orientation: string;
    collaborators: string[];
    configuration: string;
    collector_number: string;
    effect_html: string;
  };
  effect_html: string;
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

export interface DetailProductGAWithPriceInterface {
  id: number;
  productId: number;
  name: string;
  cleanName: string;
  imageUrl: string;
  categoryId: number;
  groupId: number;
  url: string;
  modifiedOn: Date;
  imageCount: number;
  lowPrice: number;
  midPrice: number;
  highPrice: number;
  marketPrice: number;
  directLowPrice: number;
  subTypeName: string;
  extRarity: string;
  extNumber: string;
  extDescription: string;
  extCardType: string;
  extCardSubtype: string;
  extElement: string;
  extClass: string;
  extReserveCost: string | null;
  extSpeed: string | null;
  extFlavorText: string | null;
  extPower: string | null;
  extLife: string | null;
  extMemoryCost: string | null;
  extLevel: string | null;
  extDurability: string | null;
}
