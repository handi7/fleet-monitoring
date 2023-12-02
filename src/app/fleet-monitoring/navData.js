import { FaRegMap, FaRegUser } from "react-icons/fa";
import { FiInfo, FiLogIn } from "react-icons/fi";
import { PiPackageLight } from "react-icons/pi";

export const topNav = [
  {
    id: 1,
    label: "Monitoring",
    icon: <FaRegMap size={20} />,
  },
  {
    id: 1,
    label: "Label",
    icon: <PiPackageLight size={20} />,
  },
];

export const bottomNav = [
  {
    id: 1,
    label: "Info",
    icon: <FiInfo size={20} />,
  },
  {
    id: 1,
    label: "Profile",
    icon: <FaRegUser size={20} />,
  },
  {
    id: 1,
    label: "Logout",
    icon: <FiLogIn size={20} />,
  },
];
