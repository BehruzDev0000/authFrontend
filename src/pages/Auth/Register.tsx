import { Link } from "react-router-dom"

const Register = () => {
  return (
     <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-4">
   
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

              <form className="mt-8 space-y-4" autoComplete="off" spellCheck="false">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    placeholder="First name"
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:border-white/20"
                  />
                  <input
                    placeholder="Last name"
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:border-white/20"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:border-white/20"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:border-white/20"
                />

                <label className="flex items-center gap-3 text-sm text-white/70 pt-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/10 accent-emerald-400"
                  />
                  I agree to the Terms
                </label>

                <button
                  type="button"
                  className="w-full mt-2 rounded-2xl bg-white py-4 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
                >
                  Create account
                </button>

                <p className="pt-2 text-center text-sm text-white/60">
                  Already have an account?{" "}
                  <Link to='/' className="text-white hover:underline underline-offset-4">
                  
                    Sign in
                    </Link>
                </p>
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