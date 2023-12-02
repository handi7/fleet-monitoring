"use client";

import { bottomNav, topNav } from "./navData";

function Navbar() {
  const onNavHover = (id, isHover = false) => {
    const navLabel = document.getElementById(id);
    navLabel && (navLabel.style.width = isHover ? "100px" : "0px");
  };

  const NavItem = ({ id, nav }) => (
    <button
      className="w-full relative flex justify-center items-center py-3"
      onMouseEnter={() => onNavHover(id, true)}
      onMouseLeave={() => onNavHover(id)}
    >
      {nav?.icon}
      <span
        id={id}
        className="absolute w-0 left-16 text-sm text-start overflow-hidden duration-500"
      >
        <span className="bg-white/20 px-2 py-1 rounded-lg">{nav?.label}</span>
      </span>
    </button>
  );

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
