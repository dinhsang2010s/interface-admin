import grapescss from 'grapesjs/dist/css/grapes.min.css';
import "./style.less"
import grapesjs, {Editor} from 'grapesjs';
import GjsEditor from '@grapesjs/react';
import gjsblockbasic from 'grapesjs-blocks-basic'
import gjspresetnewsletter from 'grapesjs-preset-newsletter';
import {Button} from "antd";
import {useRef} from "react";

export const EditorPage = () => {
    const editorRef = useRef<Editor>()
    const onEditor = (editor: Editor) => {
        editorRef.current = editor
    };


    return <div id="model-builder-page" className="w-full h-full">
        <Button onClick={() => {
            console.log(editorRef.current?.runCommand('gjs-get-inlined-html'))
        }}>asd</Button>
        <GjsEditor
            id='grapesjs-react'
            grapesjs={grapesjs}
            grapesjsCss={grapescss}
            options={{height: "100%", storageManager: false}}
            plugins={[
                gjsblockbasic,
                gjspresetnewsletter
            ]}
            onEditor={onEditor}
        />
    </div>
}
