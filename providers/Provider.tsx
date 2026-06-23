"use client"

import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { ThemeProvider } from "@/components/common/Theme";

// INTERFACE
interface ProviderProps {
    children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
    return (
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </CookiesProvider>
    );
};