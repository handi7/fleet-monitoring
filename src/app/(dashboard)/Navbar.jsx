"use client";

import { useEffect } from "react";
import { bottomNav, topNav } from "./navData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProfile } from "../../services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();

  const getUserProfile = async () => {
    try {
      const res = await getProfile();
      const userData = {
        id: res?.id,
        name: res?.transporter_name,
        email: res?.email,
        verified_at: res?.email_verified_at,
        created_at: res?.created_at,
        updated_at: res?.updated_at,
      };
      dispatch(setUser(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const onNavHover = (id, isHover = false) => {
    const navLabel = document.getElementById(id);
    navLabel && (navLabel.style.width = isHover ? "100px" : "0px");
  };

  const onItemClick = (nav) => {
    if (nav?.label === "Logout") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userData");
      router.push("/");
    } else {
      router.push(nav?.path);
    }
  };

  const NavItem = ({ id, nav }) => (
    <button
      className="w-full relative flex justify-center items-center py-3"
      onMouseEnter={() => onNavHover(id, true)}
      onMouseLeave={() => onNavHover(id)}
      onClick={() => onItemClick(nav)}
    >
      <span className={`${path?.includes(nav?.path) ? "text-yellow-400" : ""}`}>
        {nav?.icon}
      </span>
      <span
        id={id}
        className="absolute w-0 left-16 text-sm text-start overflow-hidden duration-500 z-50"
      >
        <span className="bg-primary/50 px-2 py-1 rounded-lg">{nav?.label}</span>
      </span>
    </button>
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/");
    getUserProfile();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div>
        {topNav?.map((nav, i) => (
          <NavItem key={i} id={`topNav${i}`} nav={nav} />
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
