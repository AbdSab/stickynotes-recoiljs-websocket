import React from 'react'
import { useRecoilState } from 'recoil';
import { textEditorStateFamily } from '../../atoms/textEditor';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({id=0}) => {
    const [text, setText] = useRecoilState(textEditorStateFamily(id));

    const handleChange = (content, editor) => {
        setText(content);
    }

    console.log(text)

    return (
        <Editor
         value={text}
         init={{
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={handleChange}
       />
    )
}

export default TextEditor;