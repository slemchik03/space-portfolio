import { Variants, useScroll } from "framer-motion";
import { useNavbarStatus } from "../store/useNavbarStatus";
import { useEffect } from "react";

function getNavbarVariants() {
  const variants: Variants = {
    open: {
      translateY: ["-100%", "0%"],
      scale: [0.85, 1],
    },
    closed: {
      translateY: ["0%", "-100%"],
      scale: [1, 0.85],
    },
  };
  return variants;
}
export default function useNavbar() {
  const { scrollY } = useScroll();
  const { isOpen, changeStatus } = useNavbarStatus();

  useEffect(() => {
    function scrollHandler(y: number) {
      const prevY = scrollY.getPrevious();
      if (!prevY) return;
      if (prevY < y && isOpen) {
        changeStatus(false);
      } else if (prevY > y && !isOpen) {
        changeStatus(true);
      }
    }
    scrollY.on("change", scrollHandler);
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY, isOpen]);

  const variants = getNavbarVariants();

  return { navbarVariants: variants, isOpen };
}
