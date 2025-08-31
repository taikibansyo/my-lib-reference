import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ApolloWrapper } from "@/components/ApolloWrapper";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charanko",
  description: "A modern UI library project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ApolloWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen grid grid-rows-[auto,1fr] grid-cols-1 md:grid-cols-[240px_1fr]">
              <Header className="md:col-span-2" />
              <Sidebar className="hidden md:block" />
              <main className="p-4">{children}</main>
            </div>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
