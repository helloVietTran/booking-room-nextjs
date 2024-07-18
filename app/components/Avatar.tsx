"use client"
import Image from "next/image"
import useCurrentUser from "../hooks/useCurrentUser"
interface AvatarProps{
  src?: string;
}
const Avatar = () => {
  const { user } = useCurrentUser();
  return (
    <Image 
    className="rounded-full"
    width={25}
    height={25}
    alt="avatar"
    src={user?.avatarUrl ? user.avatarUrl :"/images/avatar-default.svg"}
    />
  )
}

export default Avatar