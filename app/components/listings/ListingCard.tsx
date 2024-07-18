"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import useCountries from "@/app/hooks/useCountry";
import HeartButton from "../HeartButton";
import formatNumber from "@/app/utils/formatNumber";
import Button from "../Button";

interface Location {
  region: string;
  label: string;
}
interface Listing {
  id: string;
  category: string;
  location: Location | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}
interface Reservation {
  id: string;
  listing: any;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
}
interface ListingCardProps {
  data: Listing;
  reservation: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser: null;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  //const location = getByValue(data.location?.address);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  return (
    <div
      onClick={() => router.push(`/rooms/${data.id}`)}
      className="
            col-span-1 cursor-pointer group
        "
    >
      <div className="flex flex-col gap-1 w-full">
        <div
          className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-lg
            "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div
          className="
                    font-semibold text-lg
                "
        >
          {data.location?.region}, {data.location?.label}
        </div>
        <div className="font-light text-neutral-500">
            {data.category}
        </div>
        <div
            className="flex flex-row items-center gap-1"    
        >
            <div 
                className="font-semibold"
            >
                {formatNumber(data.price)} đ / đêm
            </div>
            { onAction && actionLabel (
                <Button
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick={handleCancel}
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
