import { Socials } from "@/constants";
import { X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  closeMenu: () => void;
  open?: boolean;
}
export default function BurgerMenu({ open, closeMenu }: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, zIndex: -100 }}
        animate={{ opacity: open ? 1 : 0, zIndex: open ? 99 : -100 }}
        className="fixed inset-0 bg-black bg-opacity-55 top-0 left-0 min-h-screen min-w-screen"
      ></motion.div>
      <motion.div
        initial={{ translateX: "100%" }}
        animate={{ translateX: open ? "0%" : "100%" }}
        className="fixed flex top-0 min-h-screen right-0 min-w-full md:min-w-[400px] backdrop-blur-xl z-[100]"
        transition={{ ease: "easeInOut" }}
      >
        <div className="relative grid grid-rows-[100px_1fr] flex-1 min-h-full">
          <X
            onClick={closeMenu}
            className="text-white absolute top-10 right-4 cursor-pointer"
          />
          <span className="text-white text-2xl text-center pt-10">
            MY SOCIALS
          </span>
          <div className="grid justify-center items-center grid-flow-row gap-5">
            {Socials.map((social) => (
              <div
                key={social.name}
                className="hover:bg-gray-100 hover:bg-opacity-15 p-4 rounded-xl cursor-pointer transition-all"
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={64}
                  height={64}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
