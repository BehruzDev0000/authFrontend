import { useState, type SubmitEvent } from "react"
import { Button, AuthInput, PageDirectional} from "../../components"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { LoadingBlack } from "../../assets/images"
import RegisterFn from "../../services/Register"

const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()

  const handleRegister = (e:SubmitEvent<HTMLFormElement>) => RegisterFn(e,setLoading,navigate)
  return (
     <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_600px_at_80%_90%,rgba(34,197,94,0.14),transparent_55%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[640px]">
        <div className="relative">
          <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-indigo-500/30 to-emerald-500/30 blur-xl" />
          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-semibold tracking-tight">Register</h2>
              <p className="mt-2 text-sm text-white/60">Enter your details below</p>

              <form onSubmit={handleRegister} className="mt-8 space-y-4" autoComplete="off" spellCheck="false">
               
                  <AuthInput name="firstName" placeholder="First name" type="text"  />
                  <AuthInput name="lastName" placeholder="Last name" type="text"  />
                <AuthInput name="email" placeholder="Email address" type="email" />

                <AuthInput name="password" placeholder="Password" type="text"/>

            

             <Button type="submit" extraClass={loading ? "!h-[52px] !flex !items-center !justify-center" : ""}>
                {loading ? <img src={LoadingBlack} className="h-[30px] w-[30px]" alt="Loading..." /> : 'Create account'}
                </Button>
                <PageDirectional path="/" />
              </form>
            </div>

            <div className="border-t border-white/10 px-8 py-5 text-xs text-white/45 flex justify-between">
              <span>© 2026 YourApp</span>
              <span className="text-emerald-400">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register