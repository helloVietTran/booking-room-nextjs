import Image from "next/image";
const NavBavBrand = () => {
  return (
    <button>
      <Image 
      alt="logo"
      src={"/logo/ZingMP3logo.svg.png"}
      width={120}
      height={40}
      />
    </button>
  );
};

export default NavBavBrand;
