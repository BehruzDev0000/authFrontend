import { type Dispatch, type SetStateAction, type SubmitEvent } from "react"
import toast from "react-hot-toast"
import { PathPages } from "../components"
import type { NavigateFunction } from "react-router-dom"
import instance from "../hooks/instance"
const RegisterFn = (e:SubmitEvent<HTMLFormElement>,setLoading:Dispatch<SetStateAction<boolean>>,navigate:NavigateFunction) => {
  e.preventDefault()
    setLoading(true)
    const data={
      name:e.target.firstName.value + " " + e.target.lastName.value,
      email:e.target.email.value,
      password:e.target.password.value,
      role:"admin",
      avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s"
    }
    
    
    instance.post('users/',data).then(res=>{
      setLoading(false)
      toast.success(`Muvaffaqiyatli ${res.data.name} qoshildi`)

     setTimeout(()=>{
       navigate(PathPages.login)
     },1000)
    }).finally(()=>setLoading(false))
    e.target.reset()
}

export default RegisterFn