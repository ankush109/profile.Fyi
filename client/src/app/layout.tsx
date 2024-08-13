import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShoppingCartProvider } from "./middlewares/ContextProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
import { QueryClient } from "@tanstack/react-query";

import ReactQueryProvider from "./middlewares/Provider";
import { UserProvider } from "./middlewares/UserContext";

export const metadata: Metadata = {
  title: "FlipKart",
  description: "Hire me !",
};
// I have used Tanstack react Query which is a well known tool for asynchronous state management
// and for local state management I have used Context API which is suited for small scale web apps
// other options -> redux (used for large applications)

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <div className="bg-gray-100">
          <ReactQueryProvider>
            <UserProvider>
              <ShoppingCartProvider>{children} </ShoppingCartProvider>
            </UserProvider>
          </ReactQueryProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
