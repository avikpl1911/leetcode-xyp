import { useState, useEffect, useRef } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";

import { toast } from "react-toastify";

import { useParams} from "react-router";
import useLocalStorage from "../../../hooks/useLocalStorage";
import React from "react";
import { autocompletion } from "@codemirror/autocomplete";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import CircleLoader from "../../CircleLoader";
import axios from "axios";




const Playground = ({ problem, setSuccess, tcase, handleSubmit }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState(0);
	const [Lang,setLang] = useState(localStorage.getItem("codeLang")?localStorage.getItem("codeLang"):"javascript")
    const {slug} = useParams()
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
    const [lod , setLod] = useState(false)
	const [settings, setSettings] = useState({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const [runData,setRunData] = useState({})

	const [code,setCode] = useState("")


	const ref = useRef(null)
    console.log(problem)
	const [user] = [{}];
	const {
		pid
	} = useParams();

	// const handleSubmit = async () => {
		
	// };
    const recurRunCheck = async (id)=>{
        const resp = await axios.post(`https://leetcode-xyp.vercel.app/runcheck/${id}`,{
			"csrf": sessionStorage.getItem("csrf"),
			"session": localStorage.getItem("session"),		
		  }) 
    
		  console.log(JSON.parse(resp.data))
		  if(resp.status==200 && JSON.parse(resp.data).state !== "SUCCESS"){
			recurRunCheck(id)
		  }else{
			setLod(false)
			//console.log(JSON.parse(resp.data).compare_result[0]=="1")
			setRunData(JSON.parse(resp.data))
		  }
	}
    
	useEffect(()=>{
		console.log(runData)
	},[runData])


	const handleRun = async ()=>{
	   if(localStorage.getItem("session")){
		setLod(true)
		const resp = await axios.post(`https://leetcode-xyp.vercel.app/run/${slug}`,{
			"csrf": sessionStorage.getItem("csrf"),
			"session": localStorage.getItem("session"),
			"data_input":problem.exampleTestcases,			
			"lang": Lang,
			"question_id": problem.questionId,
			"typed_code": code,
		  })
		console.log(JSON.parse(resp.data)["interpret_id"])
        recurRunCheck(JSON.parse(resp.data)["interpret_id"])
	   }else{
		alert("please login to submit or run code")
	   }
       
	}

	const handleLangChange = (e)=>{
		setLang(e.target.value)
		ref.current.value = problem.codeSnippets.filter(x => x.langSlug===e.target.value)[0].code
		console.log(problem.codeSnippets.filter(x => x.langSlug===e.target.value)[0].code)
		setCode(problem.codeSnippets.filter(x => x.langSlug===e.target.value)[0].code)
		localStorage.setItem("codeLang",e.target.value)
		localStorage.setItem(`code-${slug}`,problem.codeSnippets.filter(x => x.langSlug===e.target.value)[0].code);
	}
    
    const extensions = React.useMemo(() => {
		switch (Lang) {
		  case 'javascript':
			return [javascript(), autocompletion()];
		  case 'python':
			return [python(), autocompletion()];
		  case 'cpp':
			return [cpp(), autocompletion()];
		  case 'java':
			return [java(), autocompletion()];
		  default:
			return [javascript(), autocompletion()];
		}
	  }, [Lang]);


	useEffect(() => {
		const code = localStorage.getItem(`code-${slug}`);
		const lang = localStorage.getItem(`codeLang`)

		if(lang){
			if(code){
              setCode(code)
			}else{
              setCode(problem.codeSnippets.filter(x => x.langSlug===lang)[0].code)
			  ref.current.value = problem.codeSnippets.filter(x => x.langSlug===lang)[0].code
			}
		}else{
			setCode(problem.codeSnippets.filter(x => x.langSlug==="javascript")[0].code)
			ref.current.value = problem.codeSnippets.filter(x => x.langSlug==="javascript")[0].code
		}
        
	}, []);

	const onChange = (e) => {
		console.log(e)
		setCode(e);
		localStorage.setItem(`code-${slug}`,e);
	};

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} Lang={Lang} handleLangChange={handleLangChange} />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
					    ref={ref}
						value={code}
						theme={vscodeDark}
						onChange={onChange}
						// onBeforeInput={onChange}
						extensions={extensions}
						style={{ fontSize: settings.fontSize }}
					/>
				</div>
				<div className='w-full px-5 overflow-auto'>
					{/* testcase heading */}
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							
							<div className='text-sm font-medium leading-5 text-white' style={{ padding: "8px" }}>Testcases</div>
							    
							
							
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
							
						</div>
						{lod && <CircleLoader/>}
					</div>
                    {runData.correct_answer != null && !(runData.status_msg=="Runtime Error") &&
					<div className="flex flex-row">
					{runData.correct_answer ? <p  style={{paddingLeft:"10px",paddingTop:"10px",fontSize:"30px",color:"green"}}>Accepted</p> : 
					
					
					<p  style={{paddingLeft:"10px",paddingTop:"10px",fontSize:"30px",color:"red"}}>Wrong Answer</p>}
					
					
					
					
					<p className="" style={{paddingLeft:"15px",paddingTop:"27px",fontSize:"15px"}}>Runtime: {runData.display_runtime} ms</p>
					
					</div>
					}
                    
					
                   
				    {runData.status_msg=="Time Limit Exceeded" && <p  style={{paddingLeft:"10px",paddingTop:"10px",fontSize:"30px",color:"red"}}>Time Limit Exceeded</p>}
					{runData.status_msg=="Compile Error" && 
					<>
					<p  style={{paddingLeft:"10px",paddingTop:"10px",fontSize:"30px",color:"red"}}>Compile Error</p>

					<div className='cursor-text rounded-lg border px-3 py-[10px] border-transparent  mt-2 ' style={{padding:"7px",marginLeft:"8px",marginRight:"8px",backgroundColor:"rgba(242, 77, 77, 0.46)",color:"red" }} >
								{runData.full_compile_error}
					</div>
					
					</>}

                    {runData.status_msg=="Runtime Error" && 
					<>
					<p  style={{paddingLeft:"10px",paddingTop:"10px",fontSize:"30px",color:"red"}}>Compile Error</p>

					<div className='cursor-text rounded-lg border px-3 py-[10px] border-transparent  mt-2 ' style={{padding:"7px",marginLeft:"8px",marginRight:"8px",backgroundColor:"rgba(242, 77, 77, 0.46)",color:"red" }} >
								{runData.runtime_error}
					</div>
					
					</>}


					<div className='flex'>
						{tcase.map((example, index) => (
							<div
								className='mr-2 items-start mt-2 '
								key={index}
								onClick={() => setActiveTestCaseId(index)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
									style={{marginLeft:"10px",marginTop:"10px",padding:"7px"}}
									> 
									    
									    {runData.compare_result && <div className="bg-red" style={{height:"4px",width:"4px",backgroundColor:runData.compare_result[index]=="1"?"green":"red",borderRadius:"100%",marginRight:"3px"}}></div>}
										
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='font-semibold my-4' style={{overflowY:"scroll",minHeight:"100px"}}>
						
						<p className='text-sm font-medium mt-4 text-white' style={{paddingTop:"7px",paddingLeft:"20px"}}>Input:</p>
						
						{Object.keys(tcase[0]).map((x,indx)=>{
							


							
							return <div style={{marginBottom:"5px",marginLeft:"20px"}}> 
							<label style={{color:"gray",fontSize:"13px"}}>{x}=</label>
							<div className='cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 ' style={{padding:"7px" }} >
								{tcase[activeTestCaseId][x]}
							</div>
							
							</div>}
                           
							
						)}
						
						
						{runData.code_answer && runData.code_answer[activeTestCaseId] && (<>
							<p className='text-sm font-medium mt-4 text-white' style={{paddingTop:"7px",paddingBottom:"5px",paddingLeft:"20px"}}>Code Output:</p>
						<div className='cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 ' style={{padding:"7px",marginLeft:"20px"}}>
							{runData.code_answer[activeTestCaseId]}
						</div>
						</>) }
						
						
                        
                        {runData.expected_code_answer && runData.expected_code_answer[activeTestCaseId] && (<>
							<p className='text-sm font-medium mt-4 text-white' style={{paddingTop:"7px",paddingBottom:"5px",paddingLeft:"20px"}}>Expected Code Output:</p>
						<div className='cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2 ' style={{padding:"7px",marginLeft:"20px"}}>
							{runData.expected_code_answer[activeTestCaseId]}
						</div>
						</>) }
						
						
					</div>
				</div>
			</Split>
			<EditorFooter handleSubmit={handleSubmit} handleRun={handleRun}/>
		</div>
	);
};
export default Playground;
