import { Socials } from "@/constants";
import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import useNavbar from "@/utils/hooks/useNavbar";

interface NavbarProps {
  openMenuHandler: () => void;
}

export const navbarLinks = ["/#about-me", "/#skills", "/#projects"];
const linkNames = ["About Me", "Skills", "Projects"];

const Navbar = ({ openMenuHandler }: NavbarProps) => {
  const { navbarVariants: variants, isOpen } = useNavbar();
  return (
    <motion.div
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10 max-w-[1855px] items-center rounded-t-full md:rounded-full"
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="relative w-full h-full flex flex-row items-center justify-center px-[10px]">
        <div className="w-[500px] h-full flex flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {navbarLinks.map((link, idx) => (
              <Link href={link} key={link}>
                {linkNames[idx]}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden h-[65px] xl:flex items-center absolute top-0 right-0">
          <div className="flex flex-row gap-5">
            {Socials.map((social) => (
              <Image
                src={social.src}
                alt={social.name}
                key={social.name}
                width={24}
                height={24}
              />
            ))}
          </div>
        </div>
        <Menu
          onClick={openMenuHandler}
          className="xl:hidden text-white opacity-80 cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

export default Navbar;
