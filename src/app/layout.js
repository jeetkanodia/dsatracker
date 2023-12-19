// app/layout.tsx
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"; // or `v14-appRouter` if you are using Next.js v14
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "./component/NavBar/Navbar";
import "./globals.css";
export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Navbar />
          {children}
        </AppRouterCacheProvider>

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"
          async
        ></script>
      </body>
    </html>
  );
}
