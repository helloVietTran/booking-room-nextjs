"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  hideButton?: boolean;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  hideButton,
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const toggle = () => {
    setHidePassword(!hidePassword);
  };
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={hidePassword && hideButton ? "password" : "text"}
        className={`
                peer
                w-full
                p-4
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${errors[id] ? "border-rose-500" : "border-neutral-300"}
                ${
                  errors[id]
                    ? "focus:border-rose-500"
                    : "focus:border-black-300"
                }
            `}
    
      />

      <label
        className={`absolute text-base duration-150
                   top-0.75 z-10 origin-[0] left-5
                   peer-placeholder-shown:scale-80
                   peer-placeholder-shown:translate-y-4
                   peer-placeholder-shown:bg-white
                   peer-focus:scale-75
                   peer-focus:translate-y-0
                   ${errors[id] ? "text-rose-500" : "text-zinc-400"}
                
                   `}
      >
        {label}
      </label>
      {hideButton && (
        <button 
          className="absolute right-5 bottom-1/2 translate-y-1/2"
          onClick={toggle}
        >
          {hidePassword ? (
            <MdVisibility size={24} style={{color: "#737373"}}/>
          ) : (
            <MdVisibilityOff size={24} style={{color: "#737373"}}/>
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
