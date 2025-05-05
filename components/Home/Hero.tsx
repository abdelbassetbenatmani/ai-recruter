import React from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 text-center overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-ABSOLUTE_WHITE mb-6">
          Transform Your Hiring Process <br />
          <span className="text-GREEN_60">with AI-Powered Recruitment</span>
        </h1>
        <p className="text-GREY_60 max-w-2xl mx-auto mb-10 text-lg">
          Streamline your recruitment workflow with our intelligent AI agent
          that screens, ranks, and matches candidates automatically
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Button size="lg" variant="primary">
            <Link href="/signin">Get Started</Link>
          </Button>
          <Button size="lg" variant="secondaryOutline">
            Learn More
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <Image
          src="/hero-svg.svg"
          alt="hero"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
