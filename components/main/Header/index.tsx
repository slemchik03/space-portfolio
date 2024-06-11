"use client";

import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import Navbar from "./Navbar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div id="header relative">
      <video
        autoPlay
        muted
        loop
        className={"object-cover absolute top-[-300px] translate-x-[-50%] left-[50%] rotate-180 w-full h-full max-w-[920px] max-h-[720px]"}
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      <Navbar openMenuHandler={() => setIsMenuOpen(true)} />
      <BurgerMenu closeMenu={() => setIsMenuOpen(false)} open={isMenuOpen} />
    </div>
  );
}
