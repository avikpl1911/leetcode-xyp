import React from 'react'
import RuntimeDisplay from './RuntimeDisplay'
import MemoryDisplay from './MemoryDisplay'
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
function SubmitPage({loader}) {
 if(loader){
    return (
        <div className='skeleton h-full w-full' >SubmitPage</div>
      )
 }else{
    return (
        <div className='h-full w-full' >
            <RuntimeDisplay runtime={"7"} percentile={"49.5"}/>
            <MemoryDisplay memory={"20"} percentile={"30"} />
            {"C++"}|{" Code"}
            <CodeMirror theme={vscodeDark}
            style={{
                minHeight:"100%"
            }}
            editable={false}
            />
        </div>
      )
 }
  
}

export default SubmitPage