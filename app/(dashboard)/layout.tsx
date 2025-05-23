import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import DashboardHeader from "@/components/DashboardComponents/DashboardHeader";
import DashboardSidebar from "@/components/DashboardComponents/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jigjiga University Portal",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Jigjiga University Portal",
  },
  description: "A portal for Jigjiga University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <Toaster position="top-center" />
          <DashboardHeader />
          <DashboardSidebar />
          <main className=" ml-60 p-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </body>
      </AuthSessionProvider>
    </html>
  );
}
