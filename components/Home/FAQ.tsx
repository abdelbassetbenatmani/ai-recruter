"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-GREY_15 border border-GREY_30 hover:border-GREEN_60 transition-colors duration-300">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-ABSOLUTE_WHITE">
          {question}
        </h3>
        <motion.span 
          className="text-GREEN_60 text-xl"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-GREY_90">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqItems: FAQItemProps[] = [
    {
      question: "How does the AI matching algorithm work?",
      answer: "Our AI matching algorithm uses advanced machine learning techniques to analyze both job requirements and candidate profiles. It goes beyond keyword matching by understanding context, skills relationships, and career trajectories. The system continuously learns from hiring outcomes to improve its accuracy over time, resulting in higher quality matches and reduced time-to-hire."
    },
    {
      question: "Can I integrate AI Recruiter with my existing ATS?",
      answer: "Yes, AI Recruiter is designed with integration in mind. We offer seamless connections with most popular Applicant Tracking Systems through our API. Our team provides full support during the integration process, ensuring your existing workflows are enhanced rather than disrupted. Custom integrations are also available for enterprise clients with specific requirements."
    },
    {
      question: "How secure is my data on your platform?",
      answer: "Security is our top priority. We implement bank-level encryption for all data, both in transit and at rest. Our platform is SOC 2 Type II certified and GDPR compliant. We follow a strict data governance policy that ensures your information is never shared with third parties without explicit consent. Regular security audits and penetration testing keep our systems robust against emerging threats."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide multi-tiered support to meet your needs. All plans include email support with 24-hour response times. Premium and Enterprise plans feature dedicated account managers, priority phone support, and custom training sessions. Our comprehensive knowledge base and video tutorials are available to all users, and we host monthly webinars covering advanced features and recruitment best practices."
    },
    {
      question: "How much does AI Recruiter cost?",
      answer: "AI Recruiter offers flexible pricing to accommodate businesses of all sizes. Our Starter plan begins at $199/month for small teams, while our Professional plan at $499/month includes advanced features for growing companies. Enterprise pricing is customized based on specific requirements and volume. All plans come with a 14-day free trial, and we offer annual discounts of 20% when paid upfront."
    }
  ];

  return (
    <section id="faq" className="px-8 py-16">
      <h2 className="text-3xl font-bold text-ABSOLUTE_WHITE mb-12 text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <FAQItem 
            key={index} 
            question={item.question} 
            answer={item.answer} 
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;