import React, { useEffect, useRef, useState } from 'react'
import Topbar from "../component/Topbar/Topbar"
import Workspace from '../component/Workspace/Workspace'
import { useParams } from 'react-router'
function Home() {
  const [con , setCon] = useState({})
  const [tcase,setTcase] = useState([])
  const [loading,setLoading] = useState(true)
  const signref = useRef(null)
  const [token,setToken] = useState(localStorage.getItem("session") ? localStorage.getItem("session") : "" )
  const {slug} = useParams()
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
  
      const kesp = await fetch(`http://localhost:3000/select?titleSlug=${slug}`)
      const resp = (await kesp.json())
  const meta = (JSON.parse(resp.data.question.metaData))
  console.log(meta)
  const tcase = resp.data.question.exampleTestcases.split("\n")
  setTcase(divideArray(tcase,meta))
  setCon(resp.data.question)
  sessionStorage.setItem("csrf",resp.data.question.csrf.csrftoken)
  if(kesp.ok){
    setLoading(false)
  }
})()
},[])


  return (
    <div>
			<Topbar problemPage signref={signref} token={token} />
      {!loading && <Workspace tcase={tcase} problem={con} signref={signref} t/>}
			<dialog id="my_modal_1" className="modal" ref={signref}>
  <div className="modal-box " style={{padding:"20px"}}>
    <h3 className="font-bold text-lg">Put LEETCODE_SESSION Token Here for Login</h3>
    <input type="text" placeholder="Type here" value={token} onChange={(e)=>{
      setToken(e.target.value)
    }} className="input" style={{marginTop:"20px",padding:"10px"}} />
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn" onClick={(e)=>{localStorage.setItem("session",token)}}>Set Token</button>
      </form>
    </div>
  </div>
</dialog>
		</div>
  )
}

export default Home