"use client"
import { IconType } from "react-icons";

interface ButtonProps{
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Button:React.FC<ButtonProps> = ({
    label, onClick, disabled, outline, small, icon : Icon
}) => {
  return (
    <button
        onClick={onClick}
        disabled={disabled}
        className={
            `relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            hover:opacity-80
            transition
            rounded-lg
            w-full
            ${outline ? "bg-white" : "bg-rose-500"}
            ${outline ? "border-black" : "border-rose-500"}
            ${outline ? "text-black" : "text-white"}
            ${small ? "py-1 text-sm font-light border-0" : "py-2.5 text-md font-semibold border-2" }
            `
        }
    >
        {
            Icon && (
                <Icon size={24}
                    className="absolute left-4 top-3"
                />
            )
        }
        {label}
    </button>
  )
}

export default Button;