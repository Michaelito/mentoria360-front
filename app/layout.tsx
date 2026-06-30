import { Inter, Quicksand, Geist } from "next/font/google";
import Provider from "@/providers/Provider";
import type { Metadata } from "next";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// FONTE INTER
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400", "600", "700"]
});

// FONTE QUICKSAND
const quicksand = Quicksand({
    variable: "--font-quicksand",
    subsets: ["latin"],
    weight: ["400", "600", "700"]
});

// METADATA
export const metadata: Metadata = {
    title: "MENTORIA 360 IA - Área de Membros",
    description: "VREG TECNOLOGIA DA INFORMAÇÃO - PLATAFORMA DE CURSOS"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
            <body className={`${quicksand.variable} ${inter.variable} antialiased`}>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
};