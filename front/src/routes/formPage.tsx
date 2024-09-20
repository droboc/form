import { useContext, useEffect, useState } from "react";
import FormContext from "../contexts/formContext";
import Form from "../components/form";
import { Input } from "../models/form";
import { getInputByFormId } from "../services/apis";

export default function FormPage() {
  const {id,name} = useContext(FormContext);
  const [inputs,setInputs]=useState<Input[]>([])

  useEffect(() => {
    async function fetchInputs() {
      const inputs = await getInputByFormId(id)
      console.log(inputs)
      setInputs(inputs)
    }
    fetchInputs()
    
  }, [id])

  useEffect(() => {
    
  }, [id])
  
  return (
    <>
    <div>
      <h1>{name}</h1>
    </div>
    <div>
       <Form idForm={id} inputList={inputs}/>
    </div>

    </>
  )
}