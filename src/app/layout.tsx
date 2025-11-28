import type { Metadata } from "next";
import { ThemeProvider } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "EaseMail - Conversational Email",
  description: "A next-generation conversational email experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
