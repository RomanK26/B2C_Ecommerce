import { footerSections } from "@/constants/footerConstants";
import FooterSection from "./FooterSection";
import logo from "/logo.png";
import { Link } from "react-router";
import { Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white ">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Section (Logo + About + Socials) */}
          <div>
            <div className="text-teal-600">
              <img src={logo} alt="Logo" className=" h-8 w-8 lg:h-16 lg:w-16" />
            </div>
            <p className="mt-4 max-w-xs text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            {/* Socials */}
            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href={"www.facebook.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <Facebook></Facebook>
                  <span className="sr-only">Facebook</span>
                </a>
              </li>
           
            </ul>
          </div>

          {/* Right Section (Dynamic Sections) */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {footerSections.map((section, idx) => (
              <FooterSection key={idx} {...section} />
            ))}
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()}. LoremIpsum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
