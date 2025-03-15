import React from "react";
import { BsChevronUp } from "react-icons/bs";



const EditorFooter = ({ handleSubmit,handleRun }) => {
	return (
		<div className='flex bg-dark-layer-1 absolute bottom-0 z-10 w-full'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					
				</div>
				<div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg'
						onClick={handleRun}
						style={{padding:"12px",margin:"7px"}}
					>
						Run
					</button>
					<button
						className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg mx-10'
						onClick={handleSubmit}
						style={{padding:"12px",margin:"7px"}}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;
