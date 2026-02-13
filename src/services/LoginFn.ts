import type { Dispatch, SetStateAction,SubmitEvent} from "react";
import toast from "react-hot-toast";
import instance from "../hooks/instance";

const LoginFn = (setLoading:Dispatch<SetStateAction<boolean>>,e:SubmitEvent<HTMLFormElement>,setToken:Dispatch<SetStateAction<string>>) => {
  setLoading(true)
    e.preventDefault();
    const data={
      email:e.target.email.value,
      password:e.target.password.value
    }
    
    instance.post('auth/login',data).then(res=>{
       toast.success("Muvaffaqiyatli kirdinggiz")
      setTimeout(() => {
       setToken(res.data.access_token)
      }, 1000);
    }).catch(()=>toast.error("Bunday foydalanuvchi topilmadi")).finally(()=>setLoading(false))
    e.target.reset();
  }

export default LoginFn
