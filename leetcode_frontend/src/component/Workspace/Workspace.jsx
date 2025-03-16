import { useRef, useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
//import { Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";

import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { useParams } from "react-router";
import axios from "axios";



const Workspace = ({ problem , tcase, signref}) => {
	const { width, height } = useWindowSize();
	const [success, setSuccess] = useState(false);
    const [page,setPage] = useState(1)
	const [submit,setSubmit] = useState(false)
	const [code,setCode] = useState("")
	const [Lang,setLang] = useState(localStorage.getItem("codeLang")?localStorage.getItem("codeLang"):"javascript")
	 const {slug} = useParams()

    const recurSubmit = async (id)=>{
		const resp = await axios.post(`https://leetcode-xyp.vercel.app/submit/${id}`,{
			"csrf": sessionStorage.getItem("csrf"),
			"session": localStorage.getItem("session"),		
		  }) 
    
		  console.log(JSON.parse(resp.data))
		  if(resp.status==200 && JSON.parse(resp.data).state !== "SUCCESS"){
			recurSubmit(id)
		  }else{
			//setLod(false)
			//console.log(JSON.parse(resp.data).compare_result[0]=="1")
			// setRunData(JSON.parse(resp.data))
            
		  }
	}

	const handleSubmit = async ()=>{
		const resp = await axios.post(`https://leetcode-xyp.vercel.app/submitques/${slug}`,{
			"csrf": sessionStorage.getItem("csrf"),
			"session": localStorage.getItem("session"),
			// "data_input":problem.exampleTestcases,			
			"lang": Lang,
			"question_id": problem.questionId,
			"typed_code": code,
		  })

		  recurSubmit(JSON.parse(resp.data).submission_id)
	} 

	return (
		<Split className='split' minSize={0}>
			<ProblemDescription problem={problem} page={page} setPage={setPage} submit={true}  />
			<div className='bg-dark-fill-2'>
				<Playground problem={problem} tcase={tcase} setSuccess={setSuccess} signref={signref} handleSubmit={handleSubmit} code={code} setCode={setCode} Lang={Lang} setLang={setLang}/>
				{success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} onAnimationEnd={()=>{console.log("hello")}}/>}
			</div>
		</Split>
	);
};
export default Workspace;
