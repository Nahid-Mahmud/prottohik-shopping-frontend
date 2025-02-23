"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GetHeaderTitle = () => {
  const [title, setTitle] = useState("");

  const pathname = usePathname();

  //   check if the route is dashboard the set the title to Dashboard
  useEffect(() => {
    switch (pathname) {
      case "/":
        setTitle("Analytics");
        break;
      case "/add-daily-shopping":
        setTitle("Daily Shopping");
        break;
      case "/food-buses-details":
        setTitle("Food Provider");
        break;
      case "/subscription-list":
        setTitle("Subscriber list");
        break;
      default:
        setTitle("");
        break;
    }
  }, [pathname]);

  return <div className="text-[#1C1A3C] lg:text-[22px] font-semibold leading-normal">{title}</div>;
};

export default GetHeaderTitle;
