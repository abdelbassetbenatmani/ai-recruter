interface InterviewTimerProps {
    maxDuration: number | null;
    time: number;
    formatTime: (seconds: number) => string;
    getRemainingTime: () => string;
    getTimerColor: () => string;
  }
  
  const InterviewTimer = ({
    maxDuration,
    time,
    formatTime,
    getRemainingTime,
    getTimerColor
  }: InterviewTimerProps) => {
    return (
      <header className="bg-white border-b p-4 flex justify-center items-center">
        <div className={`font-mono text-xl px-6 py-2 rounded-full border shadow-sm transition-colors duration-300 ${getTimerColor()}`}>
          {maxDuration ? getRemainingTime() : formatTime(time)}
        </div>
      </header>
    );
  };
  
  export default InterviewTimer;