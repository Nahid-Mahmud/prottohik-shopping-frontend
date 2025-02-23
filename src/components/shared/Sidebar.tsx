import Link from "next/link";
import NavLink from "./NavLink";

import { FaHome } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoBusSharp } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { Button } from "../ui/button";

const navLinks = [
  { icon: <FaHome />, href: "/", label: "home" },
  { icon: <IoBusSharp />, href: "/food-buses", label: "Food Buses" },
  { icon: <IoBusSharp />, href: "/food-buses-details", label: "Food Buses Details" },
  { icon: <HiUserGroup />, href: "/subscription-list", label: "Subscription List" },
  {
    icon: <MdOutlineWorkspacePremium />,
    href: "/subscription-Offer",
    label: " Subscription Offer  ",
  },
  { icon: <LuMessageCircleMore />, href: "/message", label: "Message" },
  { icon: <IoIosNotificationsOutline />, href: "/notification", label: "Notification" },
];

function Sidebar() {
  return (
    <div className="flex px-5 flex-col h-full bg-white border-r border-[#e5e5e5]">
      <Link href="/" className="flex  gap-2">
        <span className="font-semibold text-2xl my-5">Admin Panel</span>
      </Link>

      <nav className="flex justify-between h-full mb-10 flex-col">
        <div className="flex-1 h-full flex flex-col gap-4 pb-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <NavLink key={index} icon={link.icon} href={link.href}>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          {/* logout */}
          <Button className="flex items-center justify-start text-[#D00E11] w-[216px] p-[14px_16px] gap-2 rounded-[8px] dark:bg-[#fbe7e8] bg-[#fbe7e8]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8.33325 2.5L4.25456 4.53934C3.68992 4.82167 3.33325 5.39877 3.33325 6.03006V13.9699C3.33325 14.6013 3.68992 15.1783 4.25456 15.4607L8.33325 17.5"
                stroke="#D00E11"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5833 7.91699L16.6666 10.0003L14.5833 12.0837M8.33325 10.0003H16.1593"
                stroke="#D00E11"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#D00E11]">Logout</p>
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
