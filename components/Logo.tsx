import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <span className="text-GREEN_60 font-bold text-2xl">AI Recruiter</span>
      </Link>
    </div>
  );
};

export default Logo;
