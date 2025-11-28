"use client";

import { useState, useCallback } from "react";
import {
  MainShell,
  WelcomeScreen,
  CommandCenter,
  ThemeToggle,
  type HistoryEntry,
} from "@/components";

// Simulated responses for demo
const simulatedResponses: Record<string, string> = {
  "show unread emails": "You have 12 unread emails. Showing the most recent...",
  "what's on my calendar today": "You have 3 meetings today: Standup at 9am, Design review at 2pm, and 1:1 with Sarah at 4pm.",
  "show important emails": "Displaying 5 important emails from the past week.",
  "write a new email": "Opening composer. Who would you like to email?",
};

function getSimulatedResponse(command: string): string {
  const lowerCommand = command.toLowerCase();

  // Check for exact matches first
  if (simulatedResponses[lowerCommand]) {
    return simulatedResponses[lowerCommand];
  }

  // Check for partial matches
  if (lowerCommand.includes("unread")) {
    return simulatedResponses["show unread emails"];
  }
  if (lowerCommand.includes("calendar") || lowerCommand.includes("schedule") || lowerCommand.includes("meeting")) {
    return simulatedResponses["what's on my calendar today"];
  }
  if (lowerCommand.includes("important")) {
    return simulatedResponses["show important emails"];
  }
  if (lowerCommand.includes("compose") || lowerCommand.includes("write") || lowerCommand.includes("new email")) {
    return simulatedResponses["write a new email"];
  }

  return `I understood: "${command}". This is a demo - email integration coming soon!`;
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(true); // Demo: start connected
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCommand = useCallback((command: string) => {
    // Add command to history
    const commandEntry: HistoryEntry = {
      id: `cmd-${Date.now()}`,
      type: "command",
      content: command,
      timestamp: new Date(),
    };
    setHistory((prev) => [...prev, commandEntry]);
    setIsProcessing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const response = getSimulatedResponse(command);
      const responseEntry: HistoryEntry = {
        id: `res-${Date.now()}`,
        type: "response",
        content: response,
        timestamp: new Date(),
      };
      setHistory((prev) => [...prev, responseEntry]);
      setIsProcessing(false);
    }, 500 + Math.random() * 500);
  }, []);

  const handleQuickAction = useCallback((command: string) => {
    handleCommand(command);
  }, [handleCommand]);

  const handleConnect = useCallback(() => {
    // Demo: just toggle connected state
    setIsConnected(true);
  }, []);

  return (
    <MainShell
      contentArea={
        <div className="relative h-full">
          {/* Theme toggle - fixed position */}
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>

          {/* Main content */}
          <WelcomeScreen
            isConnected={isConnected}
            onConnect={handleConnect}
            onQuickAction={handleQuickAction}
          />
        </div>
      }
      commandCenter={
        <CommandCenter
          history={history}
          onCommand={handleCommand}
          isProcessing={isProcessing}
          placeholder="Ask me anything about your email..."
        />
      }
    />
  );
}
