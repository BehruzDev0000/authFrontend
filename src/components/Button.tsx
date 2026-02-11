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
      onClick={onClick}
      type={type}
      className={`w-full mt-2 rounded-2xl bg-white py-4 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 ${extraClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
