"use client";

import { EditorLayout, useProjectDialogs } from "@/components/editor-layout";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function EditorHome() {
  const { openCreate } = useProjectDialogs();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-copy-primary mb-2">Create a project or open an existing one</h1>
        <p className="text-copy-secondary mb-8">Start a new architecture workspace, or choose a project from the sidebar.</p>

        <div>
          <Button onClick={openCreate} size="lg">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <EditorLayout>
      <EditorHome />
    </EditorLayout>
  );
}
