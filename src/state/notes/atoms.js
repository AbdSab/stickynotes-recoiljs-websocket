import { atomFamily, atom } from "recoil";

export const noteStateList = atom({
    key: 'sticky-note-list-atom',
    default: [],
});

export const notesStateFamily = atomFamily({
    key: 'sticky-note-state',
    default: {},
});