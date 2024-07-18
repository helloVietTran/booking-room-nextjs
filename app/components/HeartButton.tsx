"use client";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser: null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId,
}) => {
  const hasFavourited = false;
  const toggleFavourite = () => {};
  return (
    <div
      onClick={toggleFavourite}
      className="
            relative
            hover:opacity-80
            transition
            cursor-pointer

        "
    >
      <AiOutlineHeart
        size={26}
        className="
            fill-white
            absolute
            -top-[2px]
            -right-[2px]
                "
      />
      <AiFillHeart
        size={22}
        className={hasFavourited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
