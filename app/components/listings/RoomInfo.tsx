"use client"
import React from 'react'
import { IconType } from 'react-icons';
import dynamic from 'next/dynamic';

import useCountries from '@/app/hooks/useCountry';
import Avatar from '../Avatar';
import RoomCategory from './RoomCategory';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface RoomInfoProps{
    currentUser: any;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    location: any;
}
const RoomInfo:React.FC<RoomInfoProps> = ({
    currentUser,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    category,
    location
}) => {
  const { getByValue } = useCountries();
  return (
    <div 
        className='col-span-4 flex flex-col gap-6'
    >
        <div
            className='flex flex-col gap-2'
        >
            <div
                className='text-lg
                            font-semibold
                            flex
                            flex-row
                            items-center
                            gap-2
                '    
            >
                <span>Người cho thuê: {}</span>
                <Avatar/>
            </div>
            <div className='
                    flex
                    flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500

            '
            >
                <span>
                     {guestCount} người
                </span>
                <span>
                     {roomCount} phòng
                </span>
                <span>
                     {bathroomCount} phòng tắm
                </span>
            </div>
        </div>
        <hr />
        {
            category && (
                <RoomCategory 
                    icon= {category.icon}
                    label = {category.label}
                    description= {category.description}
                />
            )
        }
        <hr />
        <p className='text-lg font-light text-neutral-500'>
            {description}
        </p>   
        <hr />

    </div>
  )
}

export default RoomInfo