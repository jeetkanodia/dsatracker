// app/layout.tsx
"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"; // or `v14-appRouter` if you are using Next.js v14
import { UserContextProvider } from "../context/user.context";
import { NextUIProvider } from "@nextui-org/react";

import { QuestionContextProvider } from "../context/question.context";

import Navbar from "./component/TopBar/TopBar";
import "./globals.css";
export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <main className="dark text-foreground bg-background">
            <UserContextProvider>
              <QuestionContextProvider>
                <AppRouterCacheProvider>
                  <Navbar />
                  {children}
                </AppRouterCacheProvider>
              </QuestionContextProvider>
            </UserContextProvider>
          </main>
        </NextUIProvider>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"
          async
        ></script>
      </body>
    </html>
  );
}
