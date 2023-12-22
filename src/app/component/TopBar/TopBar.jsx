"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { UserContext } from "../../../context/user.context";
import Logo from "./Logo";

export default function TopBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  return (
    <Navbar isBlurred={false} className="bg-[rgba(0,0,0,0)]">
      <NavbarBrand>
        <div className="mr-2">
          <Logo />
        </div>
        <Link href="/" className="text-white">
          <p className="font-bold text-inherit ">DSA TRACKER</p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {state?.email && state?.username && state?.userToken ? (
          <Dropdown placement="bottom-end" className="bg-[#2B2B2B]">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={state.profileImage}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="text-white bg-[#2B2B2B]"
            >
              <DropdownItem
                key="profile"
                className="h-14 gap-2 hover:bg-[#2B2B2B]"
              >
                <p className="font-semibold text-white">Signed in as</p>
                <p className="font-semibold text-white">{state?.username}</p>
              </DropdownItem>
              <DropdownItem key="system">
                <span className="text-white ">Dashboard</span>
              </DropdownItem>
              <DropdownItem key="configurations">
                <Link href={"/account"}>
                  <div className="text-white w-full h-full">Account</div>
                </Link>
              </DropdownItem>
              <DropdownItem key="help_and_feedback">Contact Us</DropdownItem>
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">
                <Button size="md" variant="flat">
                  Login
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button color="secondary" variant="flat">
                  Register
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
