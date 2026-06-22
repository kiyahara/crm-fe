import { DataGroupGAInterface, InputFilterProductsInterface } from "@/types";
import { StateCreator } from "zustand";

type GeneralStore = {
  dataGroup: DataGroupGAInterface[];
  setDataGroup: (_value: DataGroupGAInterface[]) => void;
  search: string;
  searchInput: string;
  setSearchInput: (_value: string) => void;
  loading: boolean;
  setLoading: (_value: boolean) => void;
  filterData: InputFilterProductsInterface;
  setFilterData: (_value: InputFilterProductsInterface) => void;
};

export type TypeGeneralSession = {
  generalStoreData: GeneralStore;
};

// 🔥 global debounce timer
let debounceTimer: ReturnType<typeof setTimeout>;

const generalStore: StateCreator<TypeGeneralSession> = (set) => ({
  generalStoreData: {
    dataGroup: [],
    search: "",
    searchInput: "",
    loading: false,
    filterData: {
      name: "",
      effect: "",
      sets: [],
      elements: [],
      format: {
        legality_format: "",
        legality_state: "",
      },
    },
    setDataGroup: (_value: DataGroupGAInterface[]) => {
      set((state) => ({
        generalStoreData: {
          ...state.generalStoreData,
          dataGroup: _value,
        },
      }));
    },
    setFilterData: (_value: InputFilterProductsInterface) => {
      set((state) => ({
        generalStoreData: {
          ...state.generalStoreData,
          filterData: _value,
          search: _value.name ?? "",
          searchInput: _value.name ?? "",
        },
      }));
    },
    setSearchInput: (_value: string) => {
      // ✅ update langsung (biar UI nggak lag)
      set((state) => ({
        generalStoreData: {
          ...state.generalStoreData,
          searchInput: _value,
        },
      }));

      // ❌ cancel debounce sebelumnya
      if (debounceTimer) clearTimeout(debounceTimer);

      // ⏱ debounce update ke search
      debounceTimer = setTimeout(() => {
        set((state) => ({
          generalStoreData: {
            ...state.generalStoreData,
            search: _value,
          },
        }));
      }, 500);
    },
    setLoading: (_value: boolean) => {
      set((state) => ({
        generalStoreData: {
          ...state.generalStoreData,
          loading: _value,
        },
      }));
    },
  },
});

export default generalStore;
