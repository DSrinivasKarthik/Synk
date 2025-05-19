
import React, { useState } from "react";
import Logo from "@/components/UI/Logo";
import ThemeToggle from "@/components/UI/ThemeToggle";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [activeSection, setActiveSection] = useState("notes");
  
  const sidebarItems = [
    {
      id: "notes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      label: "My Notes",
    },
    {
      id: "daily",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      label: "Daily Journal",
    },
    {
      id: "graph",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      ),
      label: "Graph",
    },
    {
      id: "shared",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      label: "Shared with Me",
    },
    {
      id: "bookmarks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
        </svg>
      ),
      label: "Bookmarks",
    },
  ];

  return (
    <div
      className={cn(
        "h-screen border-r border-border bg-background flex flex-col transition-all",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="p-3 flex items-center justify-between">
        {!collapsed && <Logo />}
        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {collapsed ? (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            ) : (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            )}
          </svg>
        </Button>
      </div>

      {!collapsed && (
        <div className="p-3">
          <div className="relative">
            <Input
              placeholder="Search notes..."
              className="pl-8"
            />
            <div className="absolute left-2.5 top-2.5 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-3">
        {sidebarItems.map((item) => (
          <div key={item.id} className="px-3 mb-1">
            {collapsed ? (
              <button
                className={cn(
                  "flex justify-center items-center w-full p-2 rounded-md",
                  activeSection === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
              </button>
            ) : (
              <SidebarItem
                icon={item.icon}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
              />
            )}
          </div>
        ))}
      </nav>

      <Separator />

      {!collapsed ? (
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-synk-accent text-white flex items-center justify-center">
              A
            </div>
            <span className="text-sm">Alex Johnson</span>
          </div>
          <ThemeToggle />
        </div>
      ) : (
        <div className="p-3 flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-synk-accent text-white flex items-center justify-center">
            A
          </div>
          <ThemeToggle />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
