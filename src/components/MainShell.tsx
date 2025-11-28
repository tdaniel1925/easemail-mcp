"use client";

import { ReactNode } from "react";

interface MainShellProps {
  contentArea: ReactNode;
  commandCenter: ReactNode;
}

export function MainShell({ contentArea, commandCenter }: MainShellProps) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Content Area - 80% */}
      <main className="flex-1 min-h-0 overflow-auto">
        {contentArea}
      </main>

      {/* Command Center - 20% with min-height */}
      <footer className="h-[20vh] min-h-[160px] max-h-[240px] border-t border-border">
        {commandCenter}
      </footer>
    </div>
  );
}
