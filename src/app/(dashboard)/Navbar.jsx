"use client";

import { useEffect } from "react";
import { bottomNav, topNav } from "./navData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const onNavHover = (id, isHover = false) => {
    const navLabel = document.getElementById(id);
    navLabel && (navLabel.style.width = isHover ? "100px" : "0px");
  };

  const NavItem = ({ id, nav, isSelected }) => (
    <button
      className="w-full relative flex justify-center items-center py-3"
      onMouseEnter={() => onNavHover(id, true)}
      onMouseLeave={() => onNavHover(id)}
    >
      <span className={`${isSelected ? "text-yellow-400" : ""}`}>
        {nav?.icon}
      </span>
      <span
        id={id}
        className="absolute w-0 left-16 text-sm text-start overflow-hidden duration-500"
      >
        <span className="bg-primary/50 px-2 py-1 rounded-lg">{nav?.label}</span>
      </span>
    </button>
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/");
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        {topNav?.map((nav, i) => (
          <NavItem
            key={i}
            isSelected={path?.includes(nav?.path)}
            id={`topNav${i}`}
            nav={nav}
          />
        ))}
      </div>
      <div>
        {bottomNav?.map((nav, i) => (
          <NavItem key={i} id={`bottomNav${i}`} nav={nav} />
        ))}
      </div>
    </div>
  );
}

export default Navbar;
