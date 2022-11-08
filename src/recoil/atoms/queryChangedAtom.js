import { atom } from "recoil";

const queryChangedAtom = atom({
  key: "queryChangedAtom",
  default: [],
});

export default queryChangedAtom;
