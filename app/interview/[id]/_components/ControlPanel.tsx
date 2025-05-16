import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff } from "lucide-react";

interface ControlPanelProps {
  isMuted: boolean;
  toggleMute: () => void;
  endInterview: () => void;
}

const ControlPanel = ({ isMuted, toggleMute, endInterview }: ControlPanelProps) => {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <Button
        variant="outline"
        size="lg"
        className={`rounded-full p-6 ${isMuted ? "bg-red-50 text-red-700 border-red-200" : ""}`}
        onClick={toggleMute}
      >
        {isMuted ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>

      <Button
        variant="destructive"
        size="lg"
        onClick={endInterview}
        className="rounded-full p-6"
      >
        <PhoneOff className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ControlPanel;