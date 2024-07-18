"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import SideBarItem from "./SideBarItem";
import { BiSearch } from "react-icons/bi";
import { RiAlbumLine } from "react-icons/ri";
import { IoLogoPlaystation } from "react-icons/io5";
import NavBavBrand from "./NavBavBrand";

interface SideBarProps {
  children: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const pathName = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "Thư viện",
        active: pathName === "/mymucsic",
        href: "/mymucsic",
        icon: IoLogoPlaystation,
      },
      {
        label: "Khám phá",
        active: pathName === "/",
        href: "/",
        icon: RiAlbumLine,
      },
      {
        label: "Tìm kiếm",
        active: pathName === "/search",
        href: "/search",
        icon: BiSearch,
      },
    ],
    [pathName]
  );
  return (
    <div className="flex h-full">
      <div className="md:flex flex-col h-full w-[240px] bg-sidebar-bg">
        <div className="flex items-center h-[70px] pl-6 pr-7">
          <NavBavBrand />
        </div>
        <div>
          {routes.map((item) => {
            return <SideBarItem key={item.label} {...item} />;
          })}
        </div>
      </div>
      <main className="h-full flex-1 text-white overflow-y-auto ">Helo</main>
    </div>
  );
};
//React.FC: định nghĩa SideBar là 1 function component với
// thuộc tính là SideBarProps
export default SideBar;
