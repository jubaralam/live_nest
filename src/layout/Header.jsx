// import React from "react";
import { ChevronLeft, Users } from "lucide-react";
import RecordingIndicator from "../components/RecordingIndicator";

const Header = () => {
    
  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button className="text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-lg">
          Design Critique - Nickelfox Website
        </h1>
        <RecordingIndicator />
      </div>
      <button className="text-gray-400 hover:text-white">
        <Users className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Header;
