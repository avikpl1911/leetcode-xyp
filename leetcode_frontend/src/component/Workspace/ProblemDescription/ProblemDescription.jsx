
import React from "react";
import { useEffect, useState } from "react";

import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import RectangleSkeleton from "../../Skeletons/RectangleSkeleton";
import CircleSkeleton from "../../Skeletons/CircleSkeleton";
import DescPage from "./DescPage";
import SubmitPage from "./SubmitPage";



const ProblemDescription = ({ problem ,page,setPage,submit ,loader,subData}) => {
	
    
    

	const returnUserDataAndProblemData = async (transaction) => {
		
	};

	const handleLike = async () => {
		
		
	};

	const handleDislike = async () => {
		
	};

	const handleStar = async () => {
		
	};


	

	return (
		<div className='bg-dark-layer-1' style={{margin:"15px"}}>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden' style={{backgroundColor:"hsla(0, 0%, 100%, 0.07)"}}>
				
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer rounded-t-md "} style={{marginLeft:"10px",backgroundColor:"black",fontWeight:"10px",padding:"10px"}}
				onClick={()=>{setPage(1)}}
				>
					Description
				</div>

				{submit && 
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer rounded-t-md "} style={{marginLeft:"10px",backgroundColor:"black",fontWeight:"10px",padding:"10px"}}
				onClick={()=>{setPage(2)}}
				>
					Submission
				</div>}
				
			</div>
            {page==1 && <DescPage problem = {problem} />}
			{submit && page==2 && <SubmitPage loader={loader} subData={subData}/>}
			
		</div>
	);
};
export default ProblemDescription;

function useGetCurrentProblem(problemId) {
}

function useGetUsersDataOnProblem(problemId) {
	
}
