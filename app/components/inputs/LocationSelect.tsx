'use client'
import React from 'react';
import Select from "react-select";
import useCountries from '@/app/hooks/useCountry';

export type ContrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;

}

interface LocationSelectProps{
    value?: ContrySelectValue;
    onChange: (value: ContrySelectValue) => void;
}


const LocationSelect: React.FC<LocationSelectProps> = ({
    value,
    onChange
}) => {
const { getAll } = useCountries();
  return (
    <div>
        <Select 
            placeholder= "Chọn một địa điểm"
            isClearable
            options={getAll()}
            value={value}
            onChange={(value)=> onChange(value as ContrySelectValue)}
            formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3'>
                    <div>{option.flag}</div>
                    <div>
                        {option.label},
                        <span className='text-neutral-500 ml-1'>
                            {option.region}
                        </span>
                    </div>
                </div>
            )}
           
            classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-base',
                option: () => 'text-base',
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#ffe4e6',
                  primary: 'black',
                },
              })}
        />

    </div>
  )
}

export default LocationSelect