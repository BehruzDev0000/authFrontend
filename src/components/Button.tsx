import type { FC, MouseEventHandler } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit";
  children: React.ReactNode;
  extraClass?: string;
}
const Button:FC<ButtonProps> = ({ type, children, extraClass, onClick }) => {
  return (
   <button
      type={type}
      onClick={onClick}
      className={`rounded-2xl w-full bg-white py-2.5 px-5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 ${extraClass ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
