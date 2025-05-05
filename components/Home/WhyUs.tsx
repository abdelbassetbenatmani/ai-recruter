import React from "react";

const WhyUs = () => {
  return (
    <section className="px-8 py-16">
      <h2 className="text-3xl font-bold text-ABSOLUTE_WHITE mb-12 text-center">
        Why Choose AI Recruiter?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-lg bg-GREY_15 border border-GREY_30">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-GREEN_60 rounded-full flex items-center justify-center mr-3">
              <span className="text-ABSOLUTE_BLACK font-bold">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-ABSOLUTE_WHITE">
              Increased Efficiency
            </h3>
          </div>
          <p className="text-GREY_60 ml-11">
            Reduce time-to-hire by up to 50% with our AI-powered recruitment
            tools.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-GREY_15 border border-GREY_30">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-GREEN_60 rounded-full flex items-center justify-center mr-3">
              <span className="text-ABSOLUTE_BLACK font-bold">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-ABSOLUTE_WHITE">
              Better Matches
            </h3>
          </div>
          <p className="text-GREY_60 ml-11">
            Our algorithms ensure you find the right candidates for your
            specific needs.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-GREY_15 border border-GREY_30">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-GREEN_60 rounded-full flex items-center justify-center mr-3">
              <span className="text-ABSOLUTE_BLACK font-bold">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-ABSOLUTE_WHITE">
              Reduce Bias
            </h3>
          </div>
          <p className="text-GREY_60 ml-11">
            Our tools help eliminate unconscious bias in the recruitment
            process.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-GREY_15 border border-GREY_30">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-GREEN_60 rounded-full flex items-center justify-center mr-3">
              <span className="text-ABSOLUTE_BLACK font-bold">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-ABSOLUTE_WHITE">
              Enterprise Security
            </h3>
          </div>
          <p className="text-GREY_60 ml-11">
            Your data is secure with our enterprise-grade security protocols.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
