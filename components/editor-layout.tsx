"use client";

import React, { useState, createContext, useContext } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface EditorLayoutProps {
  children: React.ReactNode;
}

type Project = { id: string; name: string; slug: string; owned?: boolean };

type ProjectDialogContextValue = {
  openCreate: () => void;
  openRename: (p: Project) => void;
  openDelete: (p: Project) => void;
};

const ProjectDialogContext = createContext<ProjectDialogContextValue>({
  openCreate: () => {},
  openRename: () => {},
  openDelete: () => {},
});

export function useProjectDialogs() {
  return useContext(ProjectDialogContext);
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Demo Project", slug: "demo-project", owned: true },
    { id: "2", name: "Shared Sketch", slug: "shared-sketch", owned: false },
  ]);

  const [dialog, setDialog] = useState<"none" | "create" | "rename" | "delete">("none");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const openCreate = () => {
    setActiveProject(null);
    setDialog("create");
  };

  const openRename = (p: Project) => {
    setActiveProject(p);
    setDialog("rename");
  };

  const openDelete = (p: Project) => {
    setActiveProject(p);
    setDialog("delete");
  };

  const closeDialog = () => {
    setDialog("none");
    setActiveProject(null);
  };

  const createProject = (name: string, slug: string) => {
    const id = String(Date.now());
    setProjects((s) => [{ id, name, slug, owned: true }, ...s]);
    closeDialog();
  };

  const renameProject = (id: string, name: string, slug: string) => {
    setProjects((s) => s.map((p) => (p.id === id ? { ...p, name, slug } : p)));
    closeDialog();
  };

  const deleteProject = (id: string) => {
    setProjects((s) => s.filter((p) => p.id !== id));
    closeDialog();
  };

  const slugify = (v = "") =>
    v
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  return (
    <ProjectDialogContext.Provider value={{ openCreate, openRename, openDelete }}>
      <div className="h-screen w-full bg-base overflow-hidden flex flex-col">
        {/* Navbar */}
        <EditorNavbar sidebarOpen={sidebarOpen} onSidebarToggle={toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden pt-14">
          {/* Sidebar */}
          <ProjectSidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
            projects={projects}
            onCreate={openCreate}
            onRename={openRename}
            onDelete={openDelete}
          />

          {/* Content */}
          <main className="flex-1 overflow-auto bg-base">{children}</main>
        </div>

        {/* Dialogs */}
        <Dialog open={dialog !== "none"} onOpenChange={(open) => !open && closeDialog()}>
          {/* Create */}
          {dialog === "create" && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
                <DialogDescription className="text-copy-secondary">
                  Start a new architecture workspace.
                </DialogDescription>
              </DialogHeader>

              <CreateRenameForm
                initialName={""}
                primaryLabel="Create"
                onCancel={closeDialog}
                onSubmit={(name) => createProject(name, slugify(name))}
              />
            </DialogContent>
          )}

          {/* Rename */}
          {dialog === "rename" && activeProject && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename Project</DialogTitle>
                <DialogDescription className="text-copy-secondary">
                  Current: {activeProject.name}
                </DialogDescription>
              </DialogHeader>

              <CreateRenameForm
                initialName={activeProject.name}
                autoFocus
                primaryLabel="Save"
                onCancel={closeDialog}
                onSubmit={(name) => renameProject(activeProject.id, name, slugify(name))}
              />
            </DialogContent>
          )}

          {/* Delete */}
          {dialog === "delete" && activeProject && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogDescription className="text-copy-secondary">
                  Are you sure you want to delete "{activeProject.name}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => deleteProject(activeProject.id)}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </ProjectDialogContext.Provider>
  );
}

function CreateRenameForm({
  initialName,
  onCancel,
  onSubmit,
  primaryLabel = "Save",
  autoFocus = false,
}: {
  initialName: string;
  onCancel: () => void;
  onSubmit: (name: string) => void;
  primaryLabel?: string;
  autoFocus?: boolean;
}) {
  const [name, setName] = useState(initialName || "");
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return (
    <div>
      <div className="space-y-4">
        <label className="block">
          <div className="text-sm font-medium text-copy-primary mb-1">Project name</div>
          <input
            autoFocus={autoFocus}
            className="w-full rounded-lg border border-border-default bg-surface p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                name.trim() && onSubmit(name.trim());
              }
            }}
          />
        </label>

        <div className="text-sm text-copy-secondary">Slug preview: <span className="font-mono">{slug || "—"}</span></div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => name.trim() && onSubmit(name.trim())}>{primaryLabel}</Button>
      </DialogFooter>
    </div>
  );
}
