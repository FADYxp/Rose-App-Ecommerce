import Image from "next/image";
import logo from "@public/images/logo1.svg";
import { ArrowRight } from "lucide-react";

const footerItems = [
  { title: "Home" },
  { title: "Products" },
  { title: "Categories" },
  { title: "Occasions" },
  { title: "Contact" },
  { title: "About" },
  { title: "Terms & Conditions" },
  { title: "Privacy Policy" },
  { title: "FAQs" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-800 dark:bg-zinc-900 ">
      <div className="container w-[95%] mx-auto py-5 grid grid-cols-4 ">
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            src={logo}
            alt="Rose Logo"
            width={240}
            height={225}
            className="my-4"
          />
          <h3 className="text-softPink-300 font-bold text-lg">
            Rose E-Commerce App
          </h3>
          <p className="text-zinc-100 mb-4 font-normal text-sm">
            All rights reserved | 2025
          </p>
        </div>
        <div className="flex flex-col pt-5 ">
          <h3 className="text-softPink-300 font-bold text-lg">
            Discover our website
          </h3>
          <ul>
            {footerItems.map((item, index) => (
              <li
                key={index}
                className="text-zinc-100  font-normal text-sm -mt-1 cursor-pointer hover:text-softPink-200 transition-all"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center text-center"></div>
        <div className="flex flex-col pt-5">
          <h3 className="text-softPink-300 font-semibold text-xl">
            Get<span className="text-maroon-50 font-semibold"> 20%</span> Off
            Discount Coupon
          </h3>
          <p className="text-zinc-500 text-sm -mt-2">
            By subscribing to our newsletter
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="mt-5 h-9 bg-zinc-600 py-2 px-4 rounded-full w-80 z-0  focus:outline-none  placeholder:text-zinc-400 text-sm"
            />
            <button className="dark:bg-softPink-300 absolute right-0 top-1  mt-4 bg-maroon-50 text-maroon-700 py-2 px-4 w-32 h-9   rounded-full flex items-center gap-2 justify-center hover:bg-softPink-200 hover:text-zinc-800 transition-all">
              Subscribe <ArrowRight />{" "}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
