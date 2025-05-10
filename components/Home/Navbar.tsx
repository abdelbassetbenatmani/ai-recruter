"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import Link from "next/link";
import Logo from "../Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" py-4 flex justify-between items-center relative">
     <Logo/>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <a
          href="#features"
          className="text-GREY_90 hover:text-GREEN_60 relative group"
        >
          Features
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-GREEN_60 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#testimonials"
          className="text-GREY_90 hover:text-GREEN_60 relative group"
        >
          Testimonials
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-GREEN_60 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#faq"
          className="text-GREY_90 hover:text-GREEN_60 relative group"
        >
          FAQ
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-GREEN_60 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#contact"
          className="text-GREY_90 hover:text-GREEN_60 relative group"
        >
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-GREEN_60 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      {/* Desktop CTA Button */}
      <Button display="desktop" variant="primary">
        <Link href="/signup">Get Started</Link>
      </Button>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-GREY_90 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "transform rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-GREY_90 transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-GREY_90 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-ABSOLUTE_BLACK p-6 shadow-lg md:hidden transition-all duration-300 ease-in-out z-50 ${
          isMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4">
          <a
            href="#features"
            className="text-GREY_90 hover:text-GREEN_60 py-2 border-b border-GREY_30 relative group overflow-hidden transition-all duration-300 ease-in-out"
            onClick={toggleMenu}
          >
            <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">
              Features
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-GREEN_60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <a
            href="#testimonials"
            className="text-GREY_90 hover:text-GREEN_60 py-2 border-b border-GREY_30 relative group overflow-hidden transition-all duration-300 ease-in-out"
            onClick={toggleMenu}
          >
            <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">
              Testimonials
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-GREEN_60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <a
            href="#faq"
            className="text-GREY_90 hover:text-GREEN_60 py-2 border-b border-GREY_30 relative group overflow-hidden transition-all duration-300 ease-in-out"
            onClick={toggleMenu}
          >
            <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">
              FAQ
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-GREEN_60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <a
            href="#contact"
            className="text-GREY_90 hover:text-GREEN_60 py-2 border-b border-GREY_30 relative group overflow-hidden transition-all duration-300 ease-in-out"
            onClick={toggleMenu}
          >
            <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">
              Contact
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-GREEN_60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <Button display="mobile" variant="primary">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
