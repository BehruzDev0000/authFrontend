interface AuthInputProps {
  placeholder: string
  type: "text" | "email" | "password" | "number"
  extraClass?: string
  name: "firstName" | "lastName" | "email" | "password" | "name" | "price" | "description" | "image" | "category"
}

const AuthInput = ({
  placeholder,
  type,
  extraClass,
  name
}: AuthInputProps) => {
  return (
    <input
      type={type}
      name={name}
      required
      placeholder={placeholder}
      className={`w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none focus:border-white/20 ${extraClass}`}
    />
  )
}

export default AuthInput
