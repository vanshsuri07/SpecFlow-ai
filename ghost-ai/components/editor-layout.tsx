"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";

interface EditorLayoutProps {
  children: React.ReactNode;
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen w-full bg-base overflow-hidden flex flex-col">
      {/* Navbar */}
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onSidebarToggle={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden pt-14">
        {/* Sidebar */}
        <ProjectSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Content */}
        <main className="flex-1 overflow-auto bg-base">
          {children}
        </main>
      </div>
    </div>
  );
}
