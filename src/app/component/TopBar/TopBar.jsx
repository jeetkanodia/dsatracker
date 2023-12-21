"use client";
import React, { useContext } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { UserContext } from "@/context/user.context";
import Logo from "./Logo";
export default function TopBar() {
  const { state, dispatch } = useContext(UserContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    location.href = "/";
  };

  return (
    <Navbar isBlurred={false} className="bg-[rgba(0,0,0,0)]">
      <NavbarBrand>
        <Logo className="mr-2" /> 
        <Link href="/" className="text-white">
          <p className="font-bold text-inherit ">DSA TRACKER</p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {state?.email && state?.username && state?.userToken ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://cdn.discordapp.com/avatars/911699312713560144/4a8013e1bf4929623d0efb79849b0034.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{state?.username}</p>
              </DropdownItem>
              <DropdownItem key="system">Profile</DropdownItem>
              <DropdownItem key="configurations">Account</DropdownItem>
              <DropdownItem key="help_and_feedback">Contact Us</DropdownItem>
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} size="md" href="/login" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="secondary"
                href="/register"
                variant="flat"
              >
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
