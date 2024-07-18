"use client";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import {
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla, MdWaves } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const categories = [
  {
    label: "Hướng biển",
    enLabel: "toBeach",
    icon: TbBeach,
    description: "Địa điểm thuê gần biển",
  },
  {
    label: "Cối xay gió",
    enLabel: "windmill",
    icon: GiWindmill,
    description: "Địa điểm thuê có cối xay gió",
  },
  {
    label: "Biệt thự",
    enLabel: "villa",
    icon: MdOutlineVilla,
    description: "Địa điểm thuê là biệt thự",
  },
  {
    label: "Miền quê",
    enLabel: "countryside",
    icon: TbMountain,
    description: "Địa điểm thuê ở miền quê",
  },
  {
    label: "Ven hồ",
    enLabel: "lake",
    icon: GiBoatFishing,
    description: "Địa điểm thuê ở ven hồ",
  },
  {
    label: "Hồ bơi",
    enLabel: "pool",
    icon: TbPool,
    description: "Địa điểm thuê có hồ bơi",
  },
  {
    label: "Hòn đảo",
    enLabel: "island",
    icon: GiIsland,
    description: "Địa điểm thuê ở trên đảo",
  },
  {
    label: "Lâu đài",
    enLabel: "castle",
    icon: GiCastle,
    description: "Địa điểm thuê là lâu đài",
  },
  {
    label: "Trượt tuyết",
    enLabel: "skiing",
    icon: FaSkiing,
    description: "Địa điểm thuê gần bãi trượt tuyết",
  },
  {
    label: "Bắc cực",
    enLabel: "snow",
    icon: BsSnow,
    description: "Địa điểm thuê ở Bắc cực",
  },
  {
    label: "Hang động",
    enLabel: "cave",
    icon: GiCaveEntrance,
    description: "Địa điểm thuê trong hang động",
  },
  {
    label: "Sa mạc",
    enLabel: "desert",
    icon: GiCactus,
    description: "Địa điểm thuê trên sa mạc",
  },
  {
    label: "Lướt sóng",
    enLabel: "surfing",
    icon: MdWaves,
    description: "Địa điểm thuê có bãi lướt sóng",
  },
  {
    label: "Sang trọng",
    enLabel: "luxury",
    icon: IoDiamond,
    description: "Địa điểm thuê sang trọng",
  },
];

interface ArrowProps{
  className?: string;
  style?: React.CSSProperties;
  onClick?: ()=> void;
}

const NextArrow: React.FC<ArrowProps> =({className, style, onClick}) => {
  return (
    <div className="absolute bottom-1/2 translate-y-1/2 -right-0 flex justify-center items-center z-40
                    rounded-full border-slate-400 border w-[35px] h-[35px] cursor-pointer hover:shadow-2xl"
                    onClick={onClick}>
      <SlArrowRight size={15} />
    </div>
  );
}

const  PrevArrow: React.FC<ArrowProps> = ({className, style, onClick}) => {
  return (
    <div className="absolute bottom-1/2 translate-y-1/2 --left-6 flex justify-center items-center z-40
                    rounded-full border-slate-400 border w-[35px] h-[35px] cursor-pointer hover:shadow-2xl" 
                    onClick={onClick}>
      <SlArrowLeft size={15} />
    </div>
  );
}
const Categories = () => {
  const params = useSearchParams();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 11,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 768, // screen width <= 768px
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 480, // screen width <= 480px
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <Container>
      <Slider {...settings}>
        {categories.map((item) => {
          return (
            <CategoryBox
              key={item.label}
              label={item.label}
              enLabel={item.enLabel}
              icon={item.icon}
            />
          );
        })}
      </Slider>
    </Container>
  );
};

export default Categories;
// <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
