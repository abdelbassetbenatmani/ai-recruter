import React from "react";

const Testimonials = () => {
  return (
    <section id="testimonials" className="px-8 py-16 bg-GREY_15">
      <h2 className="text-3xl font-bold text-ABSOLUTE_WHITE mb-12 text-center">
        What Our Clients Say About Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-lg bg-GREY_20 border border-GREY_30">
          <p className="text-GREY_60 mb-4">
            &quot;The AI Recruiter platform has transformed our hiring process.
            We&apos;ve reduced our time-to-hire by 40% and improved the quality
            of our candidates.&quot;
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-GREEN_60 rounded-full mr-3"></div>
            <div>
              <p className="text-ABSOLUTE_WHITE font-medium">Sarah Johnson</p>
              <p className="text-GREY_60 text-sm">HR Director, TechCorp</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-GREY_20 border border-GREY_30">
          <p className="text-GREY_60 mb-4">
            &quot;The analytics provided by AI Recruiter have given us insights
            we never had before. We can now make data-driven decisions about our
            recruitment strategy.&quot;
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-GREEN_60 rounded-full mr-3"></div>
            <div>
              <p className="text-ABSOLUTE_WHITE font-medium">Michael Chen</p>
              <p className="text-GREY_60 text-sm">CEO, Innovate Inc</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-GREY_20 border border-GREY_30">
          <p className="text-GREY_60 mb-4">
            &quot;We&apos;ve seen a significant improvement in candidate quality
            since implementing AI Recruiter. The matching algorithm is
            incredibly accurate.&quot;
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-GREEN_60 rounded-full mr-3"></div>
            <div>
              <p className="text-ABSOLUTE_WHITE font-medium">
                Jessica Williams
              </p>
              <p className="text-GREY_60 text-sm">
                Talent Acquisition, Global Solutions
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-GREY_20 border border-GREY_30">
          <p className="text-GREY_60 mb-4">
            &quot;The customer support team at AI Recruiter has been
            exceptional. They&apos;ve helped us customize the platform to meet
            our specific needs.&quot;
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-GREEN_60 rounded-full mr-3"></div>
            <div>
              <p className="text-ABSOLUTE_WHITE font-medium">Robert Martinez</p>
              <p className="text-GREY_60 text-sm">
                Recruitment Manager, Enterprise Co
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
