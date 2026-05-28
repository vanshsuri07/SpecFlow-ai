"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 w-64 bg-surface border-r border-border-default flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ marginTop: "3.5rem" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-default">
          <h2 className="text-lg font-semibold text-copy-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="my-projects" className="w-full h-full flex flex-col">
            <TabsList className="m-4 w-auto">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>

            <TabsContent value="my-projects" className="flex-1 px-4">
              <div className="flex items-center justify-center h-full text-copy-muted">
                <p>No projects yet</p>
              </div>
            </TabsContent>

            <TabsContent value="shared" className="flex-1 px-4">
              <div className="flex items-center justify-center h-full text-copy-muted">
                <p>No shared projects</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-border-default">
          <Button className="w-full" variant="default" size="default">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
