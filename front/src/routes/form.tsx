import FormPage from "./formPage"
import { useParams } from "react-router-dom"
import FormContext from "../contexts/formContext"
import { getSimpleForm } from "../services/apis";
import { useEffect, useState } from "react";


export default function Form() {
  const { id } = useParams();
  const [name,setName]=useState("")
  
  useEffect(()=>{
    async function fetchForm(){
      
      const form = await getSimpleForm(id||"")
      setName(form.name)
    }
    fetchForm()
  },[id])

  return (
    <>
      <FormContext.Provider value={{id:id||"",name}}>
        <FormPage/>
      </FormContext.Provider>
    </>
  )
}