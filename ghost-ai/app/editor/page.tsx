"use client";

import { EditorLayout } from "@/components/editor-layout";

export default function EditorPage() {
  return (
    <EditorLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-copy-primary mb-2">
          Welcome to the Editor
        </h1>
        <p className="text-copy-secondary mb-8">
          This is your editor workspace. Click the panel icon in the navbar to toggle the projects sidebar.
        </p>

        {/* Example content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-surface rounded-2xl p-6 border border-border-default">
            <h2 className="text-xl font-semibold text-copy-primary mb-2">
              📁 Getting Started
            </h2>
            <p className="text-copy-secondary">
              Start creating a new project from the sidebar to begin designing your system.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border-default">
            <h2 className="text-xl font-semibold text-copy-primary mb-2">
              🎨 Design System
            </h2>
            <p className="text-copy-secondary">
              Access the design tokens and components from the shared projects panel.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border-default">
            <h2 className="text-xl font-semibold text-copy-primary mb-2">
              👥 Collaboration
            </h2>
            <p className="text-copy-secondary">
              Work together in real-time with your team members on shared projects.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border-default">
            <h2 className="text-xl font-semibold text-copy-primary mb-2">
              ⚡ Features
            </h2>
            <p className="text-copy-secondary">
              Leverage AI-powered tools to accelerate your design workflow.
            </p>
          </div>
        </div>

        {/* Info section */}
        <div className="mt-12 bg-elevated rounded-2xl p-6 border border-border-default">
          <h3 className="text-lg font-semibold text-accent-primary mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-copy-secondary">
            The sidebar can be toggled at any time using the panel icon in the top-left navbar. Click anywhere outside the sidebar or the close button to dismiss it.
          </p>
        </div>
      </div>
    </EditorLayout>
  );
}
