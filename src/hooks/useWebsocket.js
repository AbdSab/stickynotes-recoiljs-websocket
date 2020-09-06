import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import ws from '../ws';
import { noteStateListSelector, updateNoteSelector, deleteNoteSelector, newNoteSelector } from "../state/notes";

const useWebsocket = () => {
    const setNotes = useSetRecoilState(noteStateListSelector);
    const updateNote = useSetRecoilState(updateNoteSelector);
    const deleteNote = useSetRecoilState(deleteNoteSelector);
    const newNote = useSetRecoilState(newNoteSelector);
    
    useEffect(() => {
        ws.onmessage = ({ data }) => {
            const message = JSON.parse(data);
            switch(message.type){
                case "init": {
                    setNotes(message.data.notes);
                    ws.id = message.id;
                    break;
                }
                case "notes.update": {
                    updateNote(message.data);
                    break;
                }
                case "notes.delete": {
                    deleteNote(message.data);
                    break;
                }
                case "notes.new": {
                    newNote(message.data);
                }
                default: {
                    break;
                }
            }
        };
    }, [setNotes, updateNote, deleteNote]);

    return null;
} 

export default useWebsocket;