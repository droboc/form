import { useState } from "react";
import { SimpleForm } from "../models/form";
import { updateNameForm } from "../services/apis";

export default function Button({form,control,handleFormClick}:{form:SimpleForm,control:boolean,handleFormClick:(id:string)=>void}) {
    const [label,setLabel]=useState(form.name)

    const changeFormName=async (id:string,name:string)=>{
        await updateNameForm(id,name)
    }
    
    return (
        <>
            {control ?  <div><input type="text" value={label} onChange={(e)=>setLabel(e.target.value)}/><button onClick={()=>changeFormName(form.id,label)}>Guardar</button></div>
            :<button onClick={()=>handleFormClick(form.id)}>{form.name}</button>}
        </>
    )
      
}