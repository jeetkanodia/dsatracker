"use client";
import Image from "next/image";

import { Button } from "@nextui-org/react";
import React, { useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/user.context";
import img from "../../../public/default.jpg";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
const AccountPage = () => {
  const router = useRouter();
  const [image, setImage] = useState("");

  const [imageChanged, setImageChanged] = useState(false);
  const [usernameChanged, setUsernameChanged] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    console.log("checking state", state);
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("email") &&
      localStorage.getItem("username") &&
      localStorage.getItem("profileImage")
    ) {
      setEmail(localStorage.getItem("email"));
      setUsername(localStorage.getItem("username"));
      setImage(localStorage.getItem("profileImage"));
    } else {
      router.push("/");
    }
  }, [state]);

  const convertToBase64 = (e) => {
    //set max file size limit to 1mb
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 1000000) {
      toast.error("File size too large! keep it under 1mb");
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
      setImageChanged(true);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };
  const handleImageUpload = async () => {
    if (!imageChanged && !usernameChanged)
      return toast.error("Nothing to update");

    if (image === "") return;
    console.log("doing smth");

    const token = localStorage.getItem("token");
    if (!token) return;

    console.log("uploading image");
    fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        base64: imageChanged ? image : null,
        username: usernameChanged ? username : null,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status) {
          toast.success("Successfully updated profile");

          dispatch({
            type: "UPDATE_PROFILE",
            payload: {
              username: username,
              profileImage: image,
            },
          });
          localStorage.setItem("profileImage", image);
          localStorage.setItem("username", username);
          location.reload();
        } else {
          toast.error("Error updating profile");
        }
      });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "radial-gradient(rgb(42, 37, 65), rgb(0, 0, 0))",
        }}
        className="bg-gradient-to-t from-[#2A2541] from-0% to-[#000000] to-80% w-full min-h-screen h-auto top-0 absolute bg-[#212121] flex flex-col pt-[80px]  items-center"
      >
        <Toaster />
        <div className="bg-[rgba(255,255,255,0.1)] rounded-3xl  w-auto max-w-screen-md  m-12   flex ">
          <div className="w-[48%] mt-9  mb-9 ml-9 mr-1 ">
            <div className="rounded-full w-44 h-44">
              <Image
                alt="check"
                className="w-44 z-50 h-44 rounded-full"
                width={0}
                height={0}
                src={image ? image : img}
              />
            </div>
            <div className="flex mt-4 ">
              <label className="block">
                <input
                  onChange={convertToBase64}
                  accept="image/*"
                  type="file"
                  className="block w-full text-sm text-gray-500
            file:me-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
           file:bg-blue-600 file:text-white
           hover:file:bg-blue-700
            file:disabled:opacity-50 file:disabled:pointer-events-none
            dark:file:bg-blue-500
              dark:hover:file:bg-blue-400"
                />
              </label>
            </div>
          </div>
          <div className="mt-5 flex flex-col mr-5 justify-center">
            <label
              htmlFor="email"
              className="text-white  block mb-2 text-md font-medium"
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameChanged(true);
              }}
              name="username"
              type="username"
              id="username"
              required
              className="bg-[#212121] mb-4  border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="varuniscool"
            />
            <label
              htmlFor="email"
              className="text-white block mb-2 text-md font-medium"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              disabled="true"
              className="bg-[#212121]  border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder={email}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          {" "}
          <Button onClick={handleImageUpload}>Save</Button>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
