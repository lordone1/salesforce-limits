import { CodeEditor, Language } from '@patternfly/react-code-editor'
import React, { useState } from 'react'
import { STATUS_ERROR } from '../helpers/utils'
import { Status } from './Status'

export const JsonEditorElement = ({code,setter}) => {
    const [status, setStatus] = useState(true)
    const handleJson=({value,setter})=>{
        try{
            if(value.trim() !== ''){
                const obj=JSON.parse(value);
                setStatus(true);
                setter(obj);
            }else{
                setter(null);
            }
        }catch(e){
            setStatus(false);
        }
    }
    const onEditorDidMount = (editor, monaco) => { 
        editor.layout();
        editor.focus();
        monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
      };
    return (
        <div>
            {!status && <Status status={STATUS_ERROR}/>}
            <CodeEditor
                code={JSON.stringify(code)}
                onChange={(e) => { handleJson({value:e,setter}) }}
                language={Language.javascript}
                height="100px"
                onEditorDidMount={onEditorDidMount}
            />
        </div>
    )
}
