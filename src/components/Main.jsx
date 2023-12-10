import { useEffect, useRef, useState } from "react"
import { suggestions } from "../data"
import Starter from "./Starter"
import './main.css'
import { generateMessage } from "../utils/openai";


const Main = () => {

const ref=useRef()
const [prompt,setPrompt]=useState("");
const [messages,setMessages]=useState([])
const [loading,setLoading]=useState(false)

const handleClick=async()=>{
  setLoading(true)
  try{
    const text=prompt
    setPrompt("")
    const res=await generateMessage(prompt)
    setMessages([
      ...messages,
      {text:text,isUser:true},
      {text:res,isUser:false}
    ])
    setLoading(false)
  }
  catch(err){
    setLoading(true)
    console.log(err)
  }
}

useEffect(()=>{
  setTimeout(()=>ref.current.scrollIntoView({behavior:"smooth"}),1000);
},[messages])

  return (
    <div className="bg-[#343541] h-screen flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-xl text-white p-4">ChatGPT 3.5 Clone</h1>
        {/* <Starter/> */}
        {/* messages */}
        {messages.length===0 ? <Starter/> :
        <div className="overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col">
        {/* message */}
        {messages.map((m,index)=>(
          <div key={index} className="flex items-start space-x-4 my-6 p-2">
              <img className="h-8 w-8 rounded-full" src={m.isUser?"/images/asset 0.png":"/images/logo.png"} alt="user"/>
              <div className="flex flex-col items-start">
                <p className="text-[#ececf1] font-bold">{m.isUser?"You":"ChatGPT"}</p>
                <p className="text-[#ececf1]">{m.text}</p>
              </div>
            </div>
        ))}
        <div ref={ref}/>
        </div>
        }
      
      </div>

      <div>
      {/* suggestions */}
      {messages.length===0 && 
        <div className="my-8 md:p-0 p-4 mx-auto w-full md:w-[65%] grid gap-2 grid-cols-2">
          {suggestions.map((s,index)=>(
            <div onClick={()=>setPrompt(s.title+" "+s.desc)} key={index} className="flex flex-col items-start p-2 rounded-lg border border-gray-600 cursor-pointer">
            <p className="text-sm text-[#c5c5d2]">{s.title}</p>
            <p className="text-sm font-bold text-[#585757]">{s.desc}</p>
            </div>
          ))}
        </div>
      }
      {loading && <p className="text-white text-sm animate-pulse text-center">Loading responses...</p>}
        {/* input */}
        <div className="w-full flex justify-center items-center flex-col p-4 md:p-0">
        <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
           <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} className="text-white h-full w-full p-2 outline-none bg-inherit" type="text" placeholder="Message ChatGPT clone"/>
           <button onClick={handleClick} className="bg-gray-600 h-full p-2 rounded-lg">
            <img src="/images/asset 10.svg" alt="btn-img"/>
           </button>
        </div>
         <p className="text-xs text-white p-2 text-center">ChatGPT clone can make mistakes. Consider checking important information.</p>
        </div>
      </div>

    </div>
  )
}

export default Main