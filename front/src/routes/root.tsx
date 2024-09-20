import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleForm } from "../models/form";
import { addSimpleForm, deleteSimpleForm, getSimpleForms } from "../services/apis";
import Button from "../components/button";

const Root = () => {
  const [forms, setForms] = useState<SimpleForm[]>([]);
  const navigate = useNavigate();
  const [add,setAdd]=useState(false)
  const [name,setName]=useState("")
  
  const [edit,setEdit]=useState(false)

  useEffect(() => {
    const fetchForms = async () => {
      const fetchedForms = await getSimpleForms();
      setForms(fetchedForms);
    };

    fetchForms();
  }, [edit]);

  const handleFormClick = (formId: string) => {
    navigate(`/form/${formId}`);
  };

  const deleteSelectedForm = async (id: string) => {
    await deleteSimpleForm(id);
    setForms(forms.filter((form) => form.id !== id));
  };

  return (
    <div>
      <h1>Formularios Disponibles</h1>
      <div>
        {forms.map((form) => (
          <div  key={form.id}>
          <Button form={form} control={edit} handleFormClick={handleFormClick}/>
          {edit && (
            <div>
              <button onClick={() => deleteSelectedForm(form.id)}>Eliminar {form.name}</button>
            </div>
          )}
          </div>
        ))}
        <br />
        <button onClick={()=>setAdd(true)} >Agregar</button>
        {add && <div>
            <input type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>
            <button onClick={async ()=>{
              const {id}= await addSimpleForm(name)
              setAdd(false)
              setForms([...forms,{id,name}])
              }}>Guardar</button>
            <button onClick={()=>setAdd(false)}>Cancelar</button>
        </div>
        }
        <button onClick={()=>setEdit(!edit)}>{edit ? "Finalizar edición" : "Editar"}</button>
      </div>

    </div>
  );
};

export default Root;