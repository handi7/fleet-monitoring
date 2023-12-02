import { Inter } from "next/font/google";
import "../globals.css";
import AuthLayout from "./AuthLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen flex flex-col">
          <div className="flex-initial w-full h-14 flex justify-center bg-slate-800">
            <div className="w-[1200px] h-full flex justify-between items-center">
              <div>LOGO</div>
              <div className="relative">
                <button>Login</button>
                <AuthLayout />
              </div>
            </div>
          </div>
          <div className="flex-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}