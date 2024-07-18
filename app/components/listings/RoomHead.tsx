"use client"
import React from 'react'
import Image from 'next/image';
import useCountries from '@/app/hooks/useCountry';
import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface RoomHeadProps{
    title: string;
    location: any;
    imageSrc: string;
    id: string;
    currentUser: null;
}

const RoomHead:React.FC<RoomHeadProps> = ({
    title,
    location,
    imageSrc,
    id,
    currentUser
}) => {
    const {getByValue} = useCountries();
  //  const location = getByValue(location);

  return (
    <>
      <Heading 
        title = {title}
        subtitle={`${location?.region}, ${location?.label}`}

      />
      <div
        className='w-full h-[60vh]
            overflow-hidden rounded-xl
            relative
        '
      >
        <Image 
          src={imageSrc}
          alt='room'
          fill
          className='object-cover w-full'

        />
        <div
          className='absolute top-5 right-5'
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />

          
        </div>
      </div>
    </>
  )
}

export default RoomHead