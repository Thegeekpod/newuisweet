
"use client"
import { Header } from "@/component/admin/particals/Header";
import "../globals.css";
import { Sidebar } from "@/component/admin/particals/Sidebar";

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { unstable_noStore } from "next/cache";
export default function RootLayout({ children }) {
  unstable_noStore();
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
    <html lang="en">

      <body>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar />

          <div className="flex-1 flex flex-col ">
            <Header />
            <main className="flex-1 p-6  ">
              <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {children}
            </div>
            </main>
          </div>
        </div>
      </body>
    </html>
    </QueryClientProvider>
  )
}
