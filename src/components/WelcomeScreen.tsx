"use client";

interface QuickAction {
  label: string;
  command: string;
}

interface WelcomeScreenProps {
  onQuickAction?: (command: string) => void;
  isConnected?: boolean;
  onConnect?: () => void;
}

const quickActions: QuickAction[] = [
  { label: "Show unread", command: "show unread emails" },
  { label: "Today's schedule", command: "what's on my calendar today" },
  { label: "Important emails", command: "show important emails" },
  { label: "Compose", command: "write a new email" },
];

export function WelcomeScreen({
  onQuickAction,
  isConnected = false,
  onConnect
}: WelcomeScreenProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Welcome Message */}
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-foreground tracking-tight">
            Welcome to your email
          </h1>
          <p className="text-lg text-foreground-secondary">
            What would you like to do?
          </p>
        </div>

        {/* Quick Actions or Connect Button */}
        {isConnected ? (
          <div className="flex flex-wrap justify-center gap-3">
            {quickActions.map((action) => (
              <button
                key={action.command}
                onClick={() => onQuickAction?.(action.command)}
                className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground-secondary hover:text-foreground hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={onConnect}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-background font-semibold text-sm shadow-lg hover:shadow-accent/25 focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              Connect Your Email
            </button>
            <p className="text-sm text-foreground-muted">
              Supports Gmail, Outlook, and other email providers
            </p>
          </div>
        )}

        {/* Status indicator for connected state */}
        {isConnected && (
          <div className="flex items-center justify-center gap-2 text-sm text-foreground-muted">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>Connected</span>
          </div>
        )}
      </div>
    </div>
  );
}
