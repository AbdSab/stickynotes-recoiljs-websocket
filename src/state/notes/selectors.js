import { selectorFamily, selector } from "recoil";
import { notesStateFamily, noteStateList } from "./atoms";
import { send } from "../../ws";

export const notesSelectorFamily = selectorFamily({
    key: 'sticky-note-family',
    get: id => ({get}) => get(notesStateFamily(id)),
    set: id => ({set}, note) => {
        send('notes.update',note);
        set(notesStateFamily(id), note);
    }
});

export const noteStateListSelector = selector({
    key: 'sticky-note-list',
    set: ({set}, list) => {
        const idList = [];
        list.forEach(note => {
            idList.push(note.id);
            set(notesStateFamily(note.id), note);
        });
        set(noteStateList, idList);
    },
    get: ({get}) => get(noteStateList),
});

export const noteStateListAdd = selector({
    key: 'sticky-note-list-add',
    set: ({set, get}, note) => {
        const list = [...get(noteStateList)];
        list.push(note);
        set(noteStateList, list);
    },
})

export const deleteNoteSelector = selector({
    key: 'sticky-note-list-delete',
    set: ({set, get}, id) => {
        const list = get(noteStateList);
        const found = list.findIndex(_id => _id === id);
        if(found === -1) return;
        set(noteStateList, [...list.filter(_id => _id !== id)]);
        send('notes.delete', {id});
    }
})

export const updateNoteSelector = selector({
    key: 'sticky-note-list-update',
    set: ({ set }, data) => {
        set(notesStateFamily(data.id), data);
    }
});

export const newNoteSelector = selector({
    key: 'sticky-note-list-new',
    set: ({set, get}, data) => {
        const list = get(noteStateList);
        set(noteStateList, [...list, data.id]);
        set(notesStateFamily(data.id), data);
    }
})