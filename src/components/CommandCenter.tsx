"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

export interface HistoryEntry {
  id: string;
  type: "command" | "response";
  content: string;
  timestamp: Date;
}

interface CommandCenterProps {
  onCommand: (command: string) => void;
  history: HistoryEntry[];
  isProcessing?: boolean;
  placeholder?: string;
}

export function CommandCenter({
  onCommand,
  history,
  isProcessing = false,
  placeholder = "Type a command...",
}: CommandCenterProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll history to bottom
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed && !isProcessing) {
      onCommand(trimmed);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-full flex flex-col glass rounded-t-xl mx-4 mb-0 mt-2 overflow-hidden">
      {/* History */}
      <div
        ref={historyRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0"
      >
        {history.length === 0 ? (
          <p className="text-foreground-muted text-sm font-mono">
            Type a command below to get started
          </p>
        ) : (
          history.map((entry) => (
            <div
              key={entry.id}
              className={`font-mono text-sm ${
                entry.type === "command"
                  ? "text-accent"
                  : "text-foreground-secondary"
              }`}
            >
              {entry.type === "command" && (
                <span className="text-foreground-muted mr-2">&gt;</span>
              )}
              {entry.content}
            </div>
          ))
        )}
        {isProcessing && (
          <div className="font-mono text-sm text-foreground-muted">
            <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <span className="text-accent font-mono text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isProcessing}
            className="flex-1 bg-transparent text-foreground font-mono text-sm placeholder:text-foreground-muted focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isProcessing}
            className="p-2 rounded-lg hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed text-foreground-secondary hover:text-accent"
            aria-label="Send command"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 14-7-7 14v-7H5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
