import { useState } from "react"
import { updateInput } from "../services/apis"
import { Input as InputType } from "../models/form"

export default function Input({input,control}:{input:InputType,control:boolean}) {
  const [labelInput,setLabel]=useState(input.name)
  const [typeInput,setType]=useState(input.type)
  
  const changeInput=async (id:string,label:string,type:string)=>{
    await updateInput(id,label,type)
  }
  return (
    <>
      {control ? <div><input type='text' placeholder={labelInput} value={labelInput} onChange={(e)=>setLabel(e.target.value)}/> <input type='text' placeholder={typeInput} value={typeInput} onChange={(e)=>setType(e.target.value)}/><button onClick={()=>changeInput(input.id,labelInput,typeInput)}>Guardar</button></div> : <div>
        <label>{labelInput}</label>
        <input type={typeInput}/>
      </div>}
    </>
  )
}