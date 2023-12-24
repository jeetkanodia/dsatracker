"use client";
import React, { useEffect } from "react";
import img from "../../../public/default.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Graph from "../component/Graph/Graph";
const Dashboard = () => {
  const router = useRouter();
  const [image, setImage] = React.useState("");
  const [username, setUsername] = React.useState("");

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("username") &&
      localStorage.getItem("email")
    ) {
      setUsername(localStorage.getItem("username"));
      setImage(localStorage.getItem("profileImage"));
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: "radial-gradient(rgb(42, 37, 65), rgb(0, 0, 0))",
      }}
      className="absolute top-0 w-full min-h-screen h-auto flex flex-col content-center items-center sm:pt-[100px] pt-[70px]"
    >
      <div>
        <div className=" mt-5  mb-9">
          <div className="rounded-full w-44 h-44">
            <Image
              alt="check"
              className="w-44 z-50 h-44 rounded-full"
              width={1}
              height={1}
              src={image ? image : img}
            />
          </div>
          <div className="text-center m-auto mt-4 text-2xl">{username}</div>
        </div>
      </div>

      <div className="max-w-screen-sm h-auto min-w-[70%]">
        <Graph />
      </div>
    </div>
  );
};

export default Dashboard;
