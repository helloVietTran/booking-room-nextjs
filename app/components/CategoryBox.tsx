"use client"
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string"
interface CategoryBoxProps{
    label: string;
    enLabel: string;
    icon: IconType;
    selected?: boolean;
}

const CategoryBox:React.FC<CategoryBoxProps> = ({
    label, icon:Icon, selected, enLabel
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if(params){
        currentQuery = qs.parse(params.toString());
    }
    const updateQuery: any = {
        ...currentQuery,
        category: enLabel
    }

    if(params?.get('category') === enLabel){
        delete updateQuery.category;
    }
    const url = qs.stringifyUrl({
        url: "/",
        query: updateQuery
    }, {skipNull: true});

    router.push(url);
  }, [enLabel, params, router]);

  return (
    <div
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2
                   py-3 border-b-2 hover:text-neutral-800 transition 
                   cursor-pointer 
                   ${selected ? "border-b-neutral-800" : "border-transparent"}
                   ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
        <Icon size={26} />
        <div className="font-medium text-sm ">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox