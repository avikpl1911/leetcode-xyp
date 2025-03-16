import React from 'react'
import RuntimeDisplay from './RuntimeDisplay'
import MemoryDisplay from './MemoryDisplay'
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
function SubmitPage({ loader, subData }) {

    function bytesToMegabytes(bytes) {
        if (typeof bytes !== 'number') {
          return NaN; // Return NaN for non-numeric input
        }
      
        if (bytes < 0) {
          return NaN; // Return NaN for negative input
        }
      
        const megabytes = bytes / (1024 * 1024);
        console.log(megabytes)
        return megabytes;
      }

    if (loader) {
        return (
            <div className='skeleton h-full w-full' >SubmitPage</div>
        )
    } else {
        return (
            <div className='h-full w-full' >
                {subData.check.run_success != null && (subData.check.status_msg=="Accepted" || subData.check.status_msg=="Wrong Answer" ) &&  !(subData.status_msg == "Runtime Error") &&
                    <div className="flex flex-row">
                        {subData.check.status_msg=="Accepted" ? <p style={{ paddingLeft: "10px", paddingTop: "10px", fontSize: "30px", color: "green" }}>Accepted</p> :


                            <p style={{ paddingLeft: "10px", paddingTop: "10px", fontSize: "30px", color: "red" }}>Wrong Answer</p>}




                        <p className="" style={{ paddingLeft: "15px", paddingTop: "27px", fontSize: "15px" }}>Runtime: {subData.check.display_runtime} ms</p>
                        <p className="" style={{ paddingLeft: "15px", paddingTop: "27px", fontSize: "15px" }}>{subData.check.total_correct}{" "}/{" "}{subData.check.total_testcases}{" testcases passed"}</p>
                    </div>
                }



                {subData.check.status_msg == "Time Limit Exceeded" && <p style={{ paddingLeft: "10px", paddingTop: "10px", fontSize: "30px", color: "red" }}>Time Limit Exceeded</p>}
                {subData.check.status_msg == "Compile Error" &&
                    <>
                        <p style={{ paddingLeft: "10px", paddingTop: "10px", fontSize: "30px", color: "red" }}>Compile Error</p>

                        <div className='cursor-text rounded-lg border px-3 py-[10px] border-transparent  mt-2 ' style={{ padding: "7px", marginLeft: "8px", marginRight: "8px", backgroundColor: "rgba(242, 77, 77, 0.46)", color: "red" }} >
                            {subData.check.compile_error}
                        </div>

                    </>}

                {subData.check.status_msg == "Runtime Error" &&
                    <>
                        <p style={{ paddingLeft: "10px", paddingTop: "10px", fontSize: "30px", color: "red" }}>Compile Error</p>

                        <div className='cursor-text rounded-lg border px-3 py-[10px] border-transparent  mt-2 ' style={{ padding: "7px", marginLeft: "8px", marginRight: "8px", backgroundColor: "rgba(242, 77, 77, 0.46)", color: "red" }} >
                            {subData.check.runtime_error}
                        </div>

                    </>}
                    {subData.check.input_formatted && subData.check.expected_output &&
                       <>
                    <p className='text-sm font-medium mt-4 text-white' style={{paddingTop:"7px",paddingLeft:"7px",paddingBottom:"7px"}}> Last Input:</p>
                    <div className='cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 ' style={{padding:"7px" }} >
								{subData.check.input_formatted}
					</div>
                    <p className='text-sm font-medium mt-4 text-white' style={{paddingTop:"7px",paddingLeft:"7px",paddingBottom:"7px"}}> Expected Output</p>
                    <div className='cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 ' style={{padding:"7px" }} >
								{subData.check.expected_output}
					</div>
                    <p className='text-sm font-medium mt-4 text-white' style={{paddingTop:"7px",paddingLeft:"7px",paddingBottom:"7px"}}> Code Output</p>
                    <div className='cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 ' style={{padding:"7px" }} >
								{subData.check.code_output}
					</div>
                       </>
                    }
                    
                {subData.check.status_msg=="Accepted" && <RuntimeDisplay runtime={subData.check.display_runtime} percentile={subData.check.runtime_percentile.toFixed(2)} />}
                {subData.check.status_msg=="Accepted" && <MemoryDisplay memory={bytesToMegabytes(subData.check.memory).toFixed(2)} percentile={subData.check.memory_percentile.toFixed(2)} />}
                {subData.check.status_msg=="Accepted" && <>
                {subData.check.pretty_lang}|{" Code"}
                <CodeMirror theme={vscodeDark}
                    style={{
                        minHeight: "100%"
                    }}
                    editable={false}
                    value={subData.details.code}
                    extensions={[cpp(),javascript(),python(),java()]}
                />
                </>}
                
            </div>
        )
    }

}

export default SubmitPage