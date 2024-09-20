import { useEffect, useState } from "react"
import Input from "./input"
import { addInput, deleteInput } from "../services/apis";
import { Input as InputType } from "../models/form";


export default function Form({idForm,inputList}:{idForm:string,inputList:InputType[]}) {


  console.log("input",inputList)
  const [inputs,setInputs]=useState<InputType[]>([])
  console.log("inputs",inputs)
  const [add,setAdd]=useState(false)
  const [label,setLabel]=useState("")
  const [type,setType]=useState("")
  const [edit,setEdit]=useState(false)

 
  const addNewInput=async ({label,type}:{label:string,type:string})=>{
    const resp=await addInput(idForm,label,type)
    const {id}=resp
    setInputs([...inputs,{id,name:label,type}])
  }

  const deleteSelectedInput=async (id:string)=>{
    await deleteInput(id)
    setInputs(inputs.filter(input=>input.id!==id))
  }

  


  useEffect(() => {
    if (inputList && inputList.length > 0) {
      setInputs(inputList)
    }
  }, [inputList,label,type])

  


  return (
    <>
      <div>
        <h4>Form</h4>
        <button onClick={()=>setAdd(true)}>Agregar</button>
        <button onClick={()=>setEdit(!edit)}>{edit ? "Finalizar edición" : "Editar"}</button>
        
        <div>
        {inputs.map((input)=>{
            return (
              <div key={input.id}>
                <Input input={input} control={edit}/> 
                {edit && (
                  <div>
                  <button onClick={() => deleteSelectedInput(input.id)}>Eliminar {input.name}</button>
                  </div>
                )}
              </div>
            ) 
          })}
        </div>
        {add && <div>
            <input type="text" placeholder="label" onChange={(e)=>setLabel(e.target.value)}/>
            <input type="text" placeholder="type" onChange={(e)=>setType(e.target.value)}/>
            <button onClick={()=>{
              addNewInput({label,type})
              setAdd(false)
              }}>Guardar</button>
            <button onClick={()=>setAdd(false)}>Cancelar</button>
        </div>
        }
      </div>
    </>
  )
}

