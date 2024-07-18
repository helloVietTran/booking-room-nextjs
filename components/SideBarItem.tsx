import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { IoPlayCircleOutline } from "react-icons/io5";

interface SideBarItemProps {
  icon: IconType;
  className?: String; // tùy chọn
  label: String;
  href: String;
  active?: Boolean;
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
          relative
          flex
          flex-row
          items-center
          gap-x-4
          w-full
          cusor-pointer
          font-medium
          hover:text-primary-text-color
          text-navigation-text
          py-3
          px-8
          group
      `,
        active && "text-white bg-alpha-bg border-l-2 border-purple-primary"
      )}
    >
      <Icon size={20} />
      <span className="w-100 truncate">{label}</span>
      <IoPlayCircleOutline
        size={20}
        className="absolute right-4 opacity-0 group-hover:opacity-100"
      />
    </Link>
  );
};

export default SideBarItem;
