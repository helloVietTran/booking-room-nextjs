"use client"
import React from 'react'
import { IconType} from 'react-icons'

interface CategoryInputProps{
    selected?: boolean;
    label: string;
    icon: IconType;
    onClick: (value: string)=> void;
}
const CategoryInput : React.FC<CategoryInputProps> = ({
    selected, label, icon : Icon, onClick
}) => {
  return (
    <div 
        onClick={()=> onClick(label)}
        className={`
            rounded-xl
            border-2
            flex
            p-4
            flex
            flex-col
            transition
            cursor-pointer
            hover:border-black 
            ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            <Icon size={30} />
            <h3 className='font-semibold'>
                {label}
            </h3>
    </div>
  )
}

export default CategoryInput