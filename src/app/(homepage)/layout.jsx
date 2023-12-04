import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fleet Monitoring",
  description:
    "Fleet Management offers the single platform that your company needs to monitor, plan and report your operations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen flex flex-col">
          <Navbar />
          <div className="flex-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
