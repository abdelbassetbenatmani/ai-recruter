"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, PhoneOff } from "lucide-react";

export default function StartingInterview() {
  const [time, setTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header with timer */}
      <header className="bg-white border-b p-4 flex justify-center items-center">
        <div className="bg-red-50 text-red-700 font-mono text-xl px-6 py-2 rounded-full border border-red-200 shadow-sm">
          {formatTime(time)}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          {/* Interviewer video */}
          <Card className="flex-1 flex flex-col overflow-hidden bg-black rounded-xl shadow-lg">
            <div className="relative flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Video className="w-16 h-16 text-gray-500 opacity-30" />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
                Interviewer
              </div>
            </div>
          </Card>

          {/* Your video */}
          <Card className="flex-1 flex flex-col overflow-hidden bg-black rounded-xl shadow-lg">
            <div className="relative flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Video className="w-16 h-16 text-gray-500 opacity-30" />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
                You
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className={`rounded-full p-6 ${isMuted ? "bg-red-50 text-red-700 border-red-200" : ""}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>

          <Button variant="destructive" size="lg" className="rounded-full p-6">
          <PhoneOff />
          </Button>
        </div>
      </main>
    </div>
  );
}
