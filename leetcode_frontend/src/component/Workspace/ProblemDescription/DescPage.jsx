import React from 'react'

function DescPage({problem}) {

  const loading = false
  return (
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
							<div dangerouslySetInnerHTML={{ __html: problem.content.replaceAll("https","https://asdas-beta.vercel.app/?destination=https") }} />
						</div>

						{/* Examples */}
						

						{/* Constraints */}
						
					</div>
				</div>
			</div>
  )
}

export default DescPage