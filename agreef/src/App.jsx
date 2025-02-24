import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [name, setname] = useState(null)
  const [job,setjob]=useState(null)
  const [loader, setloader] = useState(false)
  const[count,setcount]=useState(0)
  const[gov,setgov]=useState(0)
  const[pri,setpri]=useState(0)
  const[enter,setenter]=useState(0)
 async function datafunc() {
  setloader(true)
  try{
    const response=await fetch("https://aggreb-f1.vercel.app/upload",{
      method:"POST",
      body:JSON.stringify({
        Name:name,
        Preference:job,
      }
      ),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const r= await response.json()
    console.log(r)
    setenter(r.response[2])
    setgov(r.response[0])
    setpri(r.response[1])
    setcount(r.total)
    if(response.status===200){
      
    }else{
      alert('server is busy!')
    }
    await setloader(false)
  }catch(e){
    console.log(e)
    setloader(false)
  }finally{
    setloader(false)
  }
  
 }
  function filehandle(e){
    e.preventDefault()
    if(name&&job){
      const data=datafunc()
    }else{
      alert("Please enter valid data")
    }
  }
  return (
    <>
    <form  onSubmit={filehandle}>
      <div>
        <div>
          <label htmlFor='Name' >Name</label>
          <input id='Name' type='text' onChange={(e)=>setname(e.target.value)}/>       
           </div>
           <h3>Select your choice</h3>
           <div>
            <input name='job' type='radio' checked={job==="Private"} value="Private" onChange={(e)=>setjob(e.target.value)}/>
            <label>Private</label>
            <input name='job' type='radio' checked={job==="Government"} value="Government" onChange={(e)=>setjob(e.target.value)}/>
            <label>Government</label>
            <input name='job' type='radio' checked={job==="Entrepreneur"} value="Entrepreneur" onChange={(e)=>setjob(e.target.value)}/>
            <label>entrepreneur</label>
           </div>
           <button onClick={filehandle}>Submit</button>
      </div>
    </form>
   {loader?<>
    <div id='loder'>Loading...</div></>:""}
    {pri?<>
    <div>
      Total={count[0].count}
     <table border={1}>
      <thead>
      <tr>
      <th>{gov._id}-{gov.count}</th>
      <th>{enter._id}-{enter.count}</th>
        <th>{pri._id}-{pri.count}</th>
       
       
        </tr></thead>    
        <tbody>
        {Array.from({ length: Math.max(pri?.names?.length || 0, gov?.names?.length || 0, enter?.names?.length || 0) }).map((_, i) => (
          <tr key={i}>
            <td>{gov?.names?.[i] || ""}</td>
            <td>{enter?.names?.[i] || ""}</td>
            <td>{pri?.names?.[i] || ""}</td>
          </tr>
        ))} 
        </tbody>
     </table>
    </div>
    </>:<p>No data found!</p>}
      
    </>
  )
}

export default App;
