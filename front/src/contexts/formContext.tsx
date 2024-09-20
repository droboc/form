import { createContext } from "react"
import { SimpleForm } from "../models/form";

const FormContext = createContext<SimpleForm>({
  id: "",
  name: "",
});

export default FormContext;