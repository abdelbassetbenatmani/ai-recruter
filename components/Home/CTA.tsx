import React from "react";
import { Button } from "./ui/Button";
import Link from "next/link";

const CTA = () => {
  return (
    <section
      id="contact"
      className="px-8 py-16 bg-GREY_15 text-center mx-auto flex flex-col justify-center items-center"
    >
      <h2 className="text-3xl font-bold text-ABSOLUTE_WHITE mb-6">
        Ready to transform your recruitment process?
      </h2>
      <p className="text-GREY_60 max-w-2xl mx-auto mb-8 text-lg">
        Join thousands of companies that have revolutionized their hiring with
        AI Recruiter
      </p>
      <Button size="lg" variant="primary">
        <Link href="/signin">Get Started</Link>
      </Button>
    </section>
  );
};

export default CTA;
