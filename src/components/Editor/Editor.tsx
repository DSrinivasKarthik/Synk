
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Editor: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    // Save logic would go here
    setIsSaved(true);
    
    // Show saved indicator
    const saveIndicator = document.getElementById("save-indicator");
    if (saveIndicator) {
      saveIndicator.classList.add("opacity-100");
      setTimeout(() => {
        saveIndicator.classList.remove("opacity-100");
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-border py-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium animate-fade-in">Untitled Note</h1>
          <div 
            id="save-indicator"
            className={cn(
              "h-2 w-2 rounded-full bg-synk-accent opacity-0 transition-opacity",
              !isSaved && "animate-pulse-glow"
            )}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleSave}
            disabled={isSaved}
          >
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button size="sm" variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Share
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="editor-container animate-scale-in">
          <textarea
            className="w-full h-[calc(100vh-150px)] bg-transparent border-0 resize-none focus:outline-none focus:ring-0 text-lg"
            placeholder="Start writing..."
            value={content}
            onChange={handleContentChange}
            autoFocus
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
