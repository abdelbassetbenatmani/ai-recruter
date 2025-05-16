import Logo from "@/components/Logo";

const InterviewHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16">
      <Logo />
    </header>
  );
};

export default InterviewHeader;