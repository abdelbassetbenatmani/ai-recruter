import { Card } from "@/components/ui/card";
import { Video, MicOff } from "lucide-react";

interface VideoCardProps {
  isHighlighted: boolean;
  highlightColor: "green" | "blue" | "red";
  label: string;
  isSpeaking: boolean;
  isMuted?: boolean;
  speakerType: "ai" | "user";
}

const VideoCard = ({
  isHighlighted,
  highlightColor,
  label,
  isSpeaking,
  isMuted = false,
  speakerType
}: VideoCardProps) => {
  const getHighlightClass = () => {
    if (!isHighlighted) return "bg-black";
    
    const colorMap = {
      green: "ring-4 ring-green-400",
      blue: "ring-4 ring-blue-400",
      red: "ring-4 ring-red-400"
    };
    
    return `${colorMap[highlightColor]} shadow-lg scale-[1.02] transition-all duration-300`;
  };

  return (
    <Card className={`flex-1 flex flex-col overflow-hidden ${getHighlightClass()} rounded-xl shadow-lg transition-all duration-300`}>
      <div className="relative flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <Video className="w-16 h-16 text-gray-500 opacity-30" />
        
        {/* Muted indicator overlay for user */}
        {speakerType === "user" && isMuted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center p-4">
              <MicOff className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <p className="text-white font-medium">
                Your microphone is muted
              </p>
              <p className="text-gray-300 text-sm mt-1">
                Click the microphone button to unmute
              </p>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2">
          {isSpeaking && (
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          )}
          
          {speakerType === "user" && isMuted ? (
            <>
              {label} <span className="text-red-400">(Muted)</span>
            </>
          ) : (
            <>
              {label} {isSpeaking && "(Speaking)"}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;