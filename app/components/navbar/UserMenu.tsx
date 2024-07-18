"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "../navbar/MenuItem";
import { useCallback, useState, useEffect } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import useRentModal from "@/app/hooks/useRentModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const { user, logout} = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  //lắng nghe sự thay đổi của state
  useEffect(()=> {
    if(user){
      setIsOpen((value) => !value);
      return;
    } 
  }, [user])
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  
  const onRent = useCallback(() => {
    if(!user){
      loginModal.onOpen();
      return;
    }
    rentModal.onOpen();

  }, [user, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Cho thuê chỗ ở
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="md:block hidden">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-50 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem onClick={() => {}} label="Chuyến đi" />
                <MenuItem onClick={() => {}} label="Yêu thích" />
                <MenuItem onClick={() => {}} label="Đặt chỗ" />
                <MenuItem onClick={() => {}} label="Tài khoản" />
                <MenuItem onClick={() => rentModal.onOpen()} label="Cho thuê chỗ ở" />
                <hr />
                <MenuItem onClick={() => {
                  setIsOpen(false);
                  logout();
                  }} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Đăng nhập" />
                <MenuItem onClick={registerModal.onOpen} label="Đăng ký" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
