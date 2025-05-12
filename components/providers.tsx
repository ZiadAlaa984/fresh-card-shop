"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "@/app/context/UserContext";

const queryClient = new QueryClient();

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  );
}
