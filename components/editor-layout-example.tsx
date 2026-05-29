"use client";

import { EditorLayout } from "./editor-layout";

/**
 * Example: Using EditorLayout
 *
 * This shows how to use the EditorLayout component which combines
 * EditorNavbar and ProjectSidebar into a unified layout structure.
 *
 * Usage:
 * ```tsx
 * import { EditorLayout } from "@/components/editor-layout";
 *
 * export default function EditorPage() {
 *   return (
 *     <EditorLayout>
 *       <div>
 *         {Your page content here}
 *       </div>
 *     </EditorLayout>
 *   );
 * }
 * ```
 *
 * Features:
 * - EditorNavbar is fixed at the top with sidebar toggle button
 * - ProjectSidebar slides in from the left when toggled
 * - Main content area takes up remaining space
 * - Sidebar state is managed within the layout component
 * - Responsive layout with proper z-index stacking
 */

export function EditorLayoutExample() {
  return (
    <EditorLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-copy-primary mb-4">
          Welcome to the Editor
        </h1>
        <p className="text-copy-secondary mb-6">
          This is the main editor workspace. Use the sidebar toggle in the navbar to open/close the projects panel.
        </p>

        {/* Example content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-2xl p-6 border border-border-default">
            <h2 className="text-xl font-semibold text-copy-primary mb-2">
              Getting Started
            </h2>
            <p className="text-copy-secondary">
              Start creating a new project from the sidebar to begin designing.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border-default">
            <h2 className="text-xl font-semibold text-copy-primary mb-2">
              Features
            </h2>
            <p className="text-copy-secondary">
              Access your projects and shared resources from the left panel.
            </p>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
