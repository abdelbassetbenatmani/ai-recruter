import React from "react";
// import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="relative max-h-[336px] md:min-h-[336px] w-full bg-GREY_15 flex items-center justify-center text-ABSOLUTE_WHITE">
      <div className="flex flex-col items-center justify-center max-w-[1200px] w-full">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-ABSOLUTE_WHITE">
          {title}
        </h2>
        {description && (
          <p className="text-lg md:text-xl font-normal text-center text-GREY_100 mt-2 md:mt-4">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
