import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
//import { Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";

import React from "react";
import useWindowSize from "../../hooks/useWindowSize";



const Workspace = ({ problem , tcase}) => {
	const { width, height } = useWindowSize();
	const [success, setSuccess] = useState(false);
	

	return (
		<Split className='split' minSize={0}>
			<ProblemDescription problem={problem}  />
			<div className='bg-dark-fill-2'>
				<Playground problem={problem} tcase={tcase} setSuccess={setSuccess}  />
				{success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />}
			</div>
		</Split>
	);
};
export default Workspace;
