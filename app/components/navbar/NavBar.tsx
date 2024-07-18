"use client"
import { useEffect } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { getCurrentUser } from "@/app/config/api";

const NavBar = () => {
  const currentUser = useCurrentUser();
  useEffect(()=> {
    getCurrentUser()
    .then((res)=> {
      currentUser.login(res.data);
    })
    .catch(()=> {
      console.log("Token has been expired")
    })
  }, [])
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-3 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default NavBar;
