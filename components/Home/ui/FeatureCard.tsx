import React, { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  gradientFrom = "from-GREEN_60",
  gradientTo = "to-GREEN_80",
}) => {
  return (
    <div className="p-6 rounded-lg bg-GREY_20 border border-GREY_30 hover:border-GREEN_60 hover:bg-GREY_20/80 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-ABSOLUTE_WHITE mb-3 group-hover:text-GREEN_60 transition-colors">
          {title}
        </h3>
        <p className="text-GREY_60 group-hover:text-GREY_90 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;