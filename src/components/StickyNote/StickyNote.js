import React, { useState, useEffect, useRef } from 'react'
import { notesSelectorFamily, deleteNoteSelector } from '../../state/notes';
import { useRecoilState, useSetRecoilState } from 'recoil';
import './StickyNote.scss';

const StickyNote = ({id=0}) => {
    const ref = useRef();
    const refText = useRef();
    const [note, setNote] = useRecoilState(notesSelectorFamily(id));
    const deleteNote = useSetRecoilState(deleteNoteSelector);
    const [draging, setDraging] = useState(null);
    useEffect(() => {
        if(!draging) return;
        const move = e => {
            setNote({
                ...note,
                x: e.clientX - draging.x,
                y: e.clientY - draging.y,
            })
        };
        const release = () => {
            setDraging(null);
        }
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', release);
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', release);
        }
    }, [draging]);

    // TODO: REALTIME RESIZE SYNC ISSUE / FOR NOW UPDATE ONLY WHEN RELEASE
    useEffect(() => {
        const resize = e => {
            if(e.target === refText.current && !draging){
                setNote({...note, width: refText.current.offsetWidth, height: refText.current.offsetHeight})
            }
        }
        // const observer = new ResizeObserver(resize);
        // observer.observe(ref.current);
        window.addEventListener('mouseup', resize);
        return () => {
            // observer.unobserve(ref.current);
            window.removeEventListener('mouseup', resize);
        }
    }, [ref, draging])

    const handleClick = e => {
        setDraging({
            x: e.clientX - ref.current.offsetLeft,
            y: e.clientY - ref.current.offsetTop,
        });
    }

    const handleTextChange = e => {
        setNote({
            ...note,
            content: e.target.value,
        })
    }

    const handleDeleteNote = () => {
        deleteNote(id);
    }

    const position = {
        left: note.x,
        top: note.y,
    }

    const size = {
        width:note.width,
        height:note.height,
    }

    return (
        <div ref={ref} className="stickynote" style={position}>
            <div className="stickynote__header" onMouseDown={handleClick} />
            <div className="stickynote__close" onClick={handleDeleteNote}>X</div>
            <textarea ref={refText} value={note.content} onChange={handleTextChange} style={size}/>
        </div>
    )
}

export default StickyNote;