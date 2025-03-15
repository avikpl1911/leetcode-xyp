import React, { useEffect, useState } from 'react'
import Topbar from "../component/Topbar/Topbar"
import Workspace from '../component/Workspace/Workspace'
function Home() {
  const [con , setCon] = useState({})
  const [tcase,setTcase] = useState([])
  const [loading,setLoading] = useState(true)
  function divideArray(arr, meta) {
    let chunkSize = meta.params.length
if (!Array.isArray(arr) || typeof chunkSize !== 'number' || chunkSize <= 0) {
  return []; // Return empty array for invalid input
}

const result = [];
for (let i = 0; i < arr.length; i += chunkSize) {
  const slice = arr.slice(i, i + chunkSize);
      var obj = {}
  slice.forEach((v,indx)=>{
        obj[meta.params[indx].name] = v;
  })
  result.push(obj)
}
return result;
}
useEffect(()=>{
(async ()=>{
      const kesp = await fetch("http://localhost:3000/select?titleSlug=two-sum")
      const resp = (await kesp.json())
  const meta = (JSON.parse(resp.data.question.metaData))
  console.log(meta)
  const tcase = resp.data.question.exampleTestcases.split("\n")
  setTcase(divideArray(tcase,meta))
  setCon(resp.data.question)
  localStorage.setItem("csrf",resp.data.question.csrf.csrftoken)
  if(kesp.ok){
    setLoading(false)
  }
})()
},[])


  return (
    <div>
			<Topbar problemPage />
      {!loading && <Workspace tcase={tcase} problem={con} />}
			
		</div>
  )
}

export default Home