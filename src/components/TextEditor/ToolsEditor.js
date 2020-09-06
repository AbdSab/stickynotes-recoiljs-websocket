import React from 'react'
import { useRecoilState } from 'recoil';
import { textEditorStateFamily } from '../../atoms/textEditor';

const ToolsEditor = ({id=0}) => {

    const [textData, setTextData] = useRecoilState(textEditorStateFamily(id));

    const setTitle = () => {
        const [start, end, text] = textData.selection;
        const newText = textData.text.split("");
        newText.splice(start, end-start, '<h1>'+text+'</h1>');
        setTextData({...textData, text:newText.join("")})
    }

    const setBold = () => {

    }

    return (
        <div>
            <button onClick={setTitle}>Title</button>
        </div>
    )
}

export default ToolsEditor;