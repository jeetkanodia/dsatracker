import Image from "next/image";
import React from "react";
import logo from "../../../../public/logo.png";
const Logo = () => {
  return <Image src={logo} alt="DSA Tracker Logo" width={22} height={22} />;
};

export default Logo;
