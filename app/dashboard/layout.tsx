"use client";

import { SideNav } from "@/components/side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <main className="flex-1 p-8 overflow-y-auto min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}
