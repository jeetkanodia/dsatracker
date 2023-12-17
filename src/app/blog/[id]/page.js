"use client";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router);
  return <p>Post: {router.query.slug}</p>;
}
