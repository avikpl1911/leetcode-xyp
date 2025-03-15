
import React from "react";
import { useEffect, useState } from "react";

import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import RectangleSkeleton from "../../Skeletons/RectangleSkeleton";
import CircleSkeleton from "../../Skeletons/CircleSkeleton";



const ProblemDescription = ({ problem}) => {
	const [user] = [{}];
	const [ currentProblem, loading, problemDifficultyClass ] = [{difficulty:"Easy",likes:10,dislikes:10}, false, "Easy"];
	const [liked, disliked, solved, starred ] = [true,false,true,true];
	const [updating, setUpdating] = useState(false);
    
    

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
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer rounded-t-md "} style={{marginLeft:"10px",backgroundColor:"black",fontWeight:"10px",padding:"10px"}}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.questionId}.{problem.title}{}</div>
						</div>
						<div className='flex items-center mt-3' style={{marginTop:"6px",marginBottom:"6px"}}>
								<div
									className={`${problem.difficulty} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
									style={{paddingLeft:"7px",paddingRight:"7px"}}
								>
									{problem.difficulty}
								</div>
								
								
							</div>
						{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<div dangerouslySetInnerHTML={{ __html: problem.content }} />
						</div>

						{/* Examples */}
						

						{/* Constraints */}
						
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

function useGetCurrentProblem(problemId) {
}

function useGetUsersDataOnProblem(problemId) {
	
}
