"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export function EditorNavbar({
  sidebarOpen,
  onSidebarToggle,
}: EditorNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-14 bg-surface border-b border-border-default flex items-center px-4 gap-4">
      {/* Left Section */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center Section */}
      <div className="flex-1"></div>

      {/* Right Section */}
      <div className="flex items-center"></div>
    </nav>
  );
}
