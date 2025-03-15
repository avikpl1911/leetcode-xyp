import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import SettingsModal from "../../../Modals/SettingsModal";
import React from "react";



const PreferenceNav = ({ setSettings, settings,Lang, handleLangChange }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);
    
	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {

        

		function exitHandler(e) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

	return (
		<div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full '>
			<div className='flex items-center text-white'>
				<button className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium' style={{marginLeft:"8px"}}>
					<div className='flex items-center px-1'>
						{/* <div className='text-xs text-label-2 dark:text-dark-label-2' >JavaScript</div> */}
						<select name="" value={Lang} className="text-xs text-label-2 dark:text-dark-label-2" style={{padding:"10px"}} id=""
						onChange={handleLangChange}
						>
							<option value="javascript" style={{padding:"10px",backgroundColor:"gray"}}>Javascript</option>
							<option value="java" style={{padding:"10px",backgroundColor:"gray"}}>Java</option>
							<option value="python" style={{padding:"10px",backgroundColor:"gray"}}>Python</option>
							<option value="cpp" style={{padding:"10px",backgroundColor:"gray"}}>C++</option>
						</select>
					</div>
				</button>
			</div>

			<div className='flex items-center m-2'>
				<button
					className='preferenceBtn group'
					onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg' style={{marginRight:"8px"}}>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip p-2' style={{padding:"4px"}}>Settings</div>
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg' style={{marginRight:"8px"}}>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceBtn-tooltip p-2' style={{padding:"4px"}}>Full Screen</div>
				</button>
			</div>
			{settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
		</div>
	);
};
export default PreferenceNav;
