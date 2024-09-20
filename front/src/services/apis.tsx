/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input, SimpleForm } from "../models/form";



const apiUrl="http://localhost:5000/api"

export async function getData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

export async function postData<T>(url: string, body: any): Promise<T> {
  console.log("url",url)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

export async function deleteData(url: string): Promise<void> {
    const response = await fetch(url, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

export async function putData<T>(url: string, body: any): Promise<T> {
  console.log("url",url)
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

export async function getSimpleForms():Promise<SimpleForm[]>{
  const rawData = await getData<any>(`${apiUrl}/Form`);
  
  // Procesamos los datos para extraer solo id y name de cada formulario
  return rawData.$values.map((form: any) => ({
    id: form.id,
    name: form.name
  }));
}



export async function getSimpleForm(id: string): Promise<SimpleForm> {
  const rawData = await getData<any>(`${apiUrl}/Form/${id}`);
  return {
    id: rawData.id,
    name: rawData.name
  };
}

export async function getFormById(id: string): Promise<any> {
  const rawData = await getData<any>(`${apiUrl}/Form/${id}`);
  return {
    id: rawData.id,
    name: rawData.name,
    inputs: rawData.inputs
  };
}

export async function getInputByFormId(id: string): Promise<Input[]> {
  const rawData = await getData<any>(`${apiUrl}/Input/${id}`);
  return rawData.$values.map((input: any) => ({
    id: input.id,
    name: input.name,
    type: input.type
  }));
}

export async function addInput(formId: string, label: string, type: string): Promise<Input> {
  const input = {
    name:label,
    type:type
  };
  const createdInput = await postData<Input>(`${apiUrl}/Input/form/${formId}`, input);
  return {
    id: createdInput.id,  
    name: createdInput.name,
    type: createdInput.type
  };

  
}


export async function deleteInput(id: string): Promise<void> {
  await deleteData(`${apiUrl}/Input/${id}`);
}

export async function updateInput(id: string, label: string, type: string): Promise<Input> {
  const input=await putData<Input>(`${apiUrl}/Input/${id}`, {name:label,type:type});
  return input
}

export async function addSimpleForm(name: string): Promise<SimpleForm> {
  const form = {
    name: name
  };
  const createdForm = await postData<SimpleForm>(`${apiUrl}/Form`, form);
  return {
    id: createdForm.id,
    name: createdForm.name
  };
}

export async function deleteSimpleForm(id: string): Promise<void> {
  await deleteData(`${apiUrl}/Form/${id}`);
}

export async function updateNameForm(id: string, name: string): Promise<SimpleForm> {
  const form=await putData<SimpleForm>(`${apiUrl}/Form/${id}`, name)
  return form
}  
  