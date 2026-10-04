import {z} from "zod";


import React from 'react';
import { DEPARTMENT, ROLES } from "@/prisma/generated/prisma/enums";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const UserInputValidationSchema = z.object({
  name:z.string().trim(),
  email:z.string().trim().email("Enter valid email."),
  password:z.string().min(8, "Password at least contain 8 characters"),
  employeeCode:z.string().trim().min(1, "Employee Code is must"),
  department:z.enum(DEPARTMENT),
  role:z.enum(ROLES),
  designation:z.string(),
  joiningDate2:z.string().min(1,"must"),
  employeeStatus:z.enum(["ACTIVE"]),
  monthalySalary:z.string().trim().regex(/^\d+/, ""),
  salaryEffectedFrom:z.string().min(1, "This is must");
  startTime:z.string(),
  endTime:z.string().min(1, "must")
})


type UserFormValidationSchema = z.infer<typeof UserInputValidationSchema>

type UserFormProps = {
  onSubmit:(values:UserFormValidationSchema) => Promise<void>,
  disabled:boolean,
  error?:string;
}
function Testpage({onSubmit, disabled, error}:UserFormProps) {

  function todayLocalDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, "0");
    const day = String(date.getDay()).padStart(2,"0")
    return `${year}-${month}-${day}`
  }
  const form = useForm<UserFormValidationSchema>({
    resolver:zodResolver(UserInputValidationSchema),
    defaultValues:{
      name:"",
      email:"",
      password:"",
      employeeCode:"",
      department:DEPARTMENT.RECEPTION,
      role:ROLES.RECEPTION,
      designation:"",
      joiningDate2:todayLocalDate(),
      employeeStatus:"ACTIVE",
      monthalySalary:"",
      salaryEffectedFrom:"",
      startTime:"",
      endTime:"",
    }
  })

  const {register, handleSubmit, formState:{errors, isSubmitting} } = form;

  function fieldError(name:keyof UserFormValidationSchema){
    return errors[name]?.message 
  }

  const isDisabled = disabled || isSubmitting ;
  return (
    <div>
      <form onSubmit={handleSubmit(async (values) => await onSubmit(values))} >
        <Field 
          label="Email"
          error={fieldError("email")} >
          <Input 
            placeholder="THis is placeolder"
            
          />
        </Field>
      </form>
    </div>
  )
}

export default Testpage;


type FieldProps = {
  label:string;
  error?:string;
  children:React.ReactNode
}
function Field({label, error,children}:FieldProps ){
  return(
    <div className="">
      <label>{label}</label>
      {children}
      {error && (<div>{error}</div>)}
    </div>
  )
}