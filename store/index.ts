import { create } from "zustand";
import generalStore, { TypeGeneralSession } from "./generalStore/generalStore";

type MainStore = TypeGeneralSession;

const useBoundStore = create<MainStore>((...state) => ({
  ...generalStore(...state),
}));

export default useBoundStore;

export type { MainStore };
