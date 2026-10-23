"use client";

import { useState } from "react";
import { X, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects?: { id: string; name: string; slug: string; owned?: boolean }[];
  onCreate?: () => void;
  onRename?: (p: { id: string; name: string; slug: string }) => void;
  onDelete?: (p: { id: string; name: string; slug: string }) => void;
}

export function ProjectSidebar({ isOpen, onClose, projects = [], onCreate, onRename, onDelete }: ProjectSidebarProps) {
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
              <div className="flex flex-col gap-2">
                {projects.filter((p) => p.owned).length === 0 && (
                  <div className="text-copy-muted">No projects yet</div>
                )}

                {projects.filter((p) => p.owned).map((p) => (
                  <div key={p.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-accent/5">
                    <div>
                      <div className="font-medium text-copy-primary">{p.name}</div>
                      <div className="text-sm text-copy-secondary">{p.slug}</div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" onClick={() => onRename?.(p)} aria-label={`Rename ${p.name}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onDelete?.(p)} aria-label={`Delete ${p.name}`}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shared" className="flex-1 px-4">
              <div className="flex flex-col gap-2">
                {projects.filter((p) => !p.owned).length === 0 && (
                  <div className="text-copy-muted">No shared projects</div>
                )}

                {projects.filter((p) => !p.owned).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5">
                    <div>
                      <div className="font-medium text-copy-primary">{p.name}</div>
                      <div className="text-sm text-copy-secondary">{p.slug}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-border-default">
          <Button className="w-full" variant="default" size="default" onClick={() => onCreate?.()}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
