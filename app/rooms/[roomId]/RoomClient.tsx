"use client";
import React, { useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import RoomHead from "../../components/listings/RoomHead";
import RoomInfo from "@/app/components/listings/RoomInfo";
interface RoomClientProps {
  room: any;
  currentUser: any;
}

const RoomClient: React.FC<RoomClientProps> = ({ room, currentUser }) => {
  const category = useMemo(() => {
    return categories.find((item) => {
      item.enLabel === room.category;
    });
  }, [categories, room]);
  console.log(category);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <RoomHead
            title={room.title}
            imageSrc={room.imageSrc}
            location={room.location}
            id={room.id}
            currentUser={currentUser}
          />

          <div 
            className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6"
          >
            <RoomInfo 
                currentUser = {currentUser}
                category = {category}
                description = {room.description}
                roomCount = {room.roomCount}
                guestCount = {room.guestCount}
                bathroomCount = {room.bathRoomCount}
                location = { room.location}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RoomClient;
