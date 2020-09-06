import React from 'react'
import { useRecoilValue } from 'recoil'
import { noteStateListSelector } from '../../state/notes'
import StickyNote from './StickyNote'

const StickyNoteList = () => {
    const notes = useRecoilValue(noteStateListSelector);
    return notes.length ? notes.map(note => <StickyNote key={note} id={note} />) : "Loading ...";
}

export default StickyNoteList;