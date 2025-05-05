import React from "react";

const Footer = () => {
  return (
    <footer className="px-8 py-12 border-t border-GREY_30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-GREEN_60 font-bold text-xl mb-4">AI Recruiter</h3>
          <p className="text-GREY_60">
            Transforming recruitment with artificial intelligence
          </p>
        </div>

        <div>
          <h4 className="text-ABSOLUTE_WHITE font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-GREY_60">
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Documentation
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-ABSOLUTE_WHITE font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-GREY_60">
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-ABSOLUTE_WHITE font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-GREY_60">
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-GREEN_60 transition-colors">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-GREY_30 flex flex-col md:flex-row justify-between items-center">
        <p className="text-GREY_60 mb-4 md:mb-0">
          © 2023 AI Recruiter. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-GREY_60 hover:text-GREEN_60 transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-GREY_60 hover:text-GREEN_60 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-GREY_60 hover:text-GREEN_60 transition-colors"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
