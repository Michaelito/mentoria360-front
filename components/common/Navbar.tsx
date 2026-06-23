"use client"

import { Moon, Sun, User, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// PROPS
interface NavbarProps {
    userName: string | undefined;
    userEmail: string | undefined;
};

/*---- =======================
NAVBAR START ---------------*/
export function Navbar({ userName, userEmail }: NavbarProps) {
    const pathname = usePathname(); // HOOK-PATHNAME
    const { theme, setTheme } = useTheme(); // NEXT-THEME

    // FUNÇÃO PARA VERIFICAR SE O PATH ATUAL ESTÁ ATIVO
    function isActiveRoute(itemUrl?: string) {
        if (!itemUrl) return false;
        // Verifica igualdade exata ou se é uma sub-rota
        return pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);
    };

    // ALTERNA ENTRE LIGHT E DARK THEME
    function handleToggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header
            className="
                sticky w-full bg-white dark:bg-[#0F1113]
                backdrop-blur-md transition-all top-0 px-6 py-3 z-40
            "
        >
            <nav className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" />
                </div>

                {/* AÇÕES E DADOS DO USUÁRIO */}
                <div className="ml-auto flex items-center gap-4">

                    {/* TOGGLE THEME */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all group"
                        onClick={handleToggleTheme}
                    >
                        <Sun className="w-[1.2rem] h-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 group-hover:text-indigo-600" />
                        <Moon className="absolute w-[1.2rem] h-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 group-hover:text-indigo-500" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* SEPARADOR VERTICAL SUTIL */}
                    <div className="w-px h-5 bg-gray-200 dark:bg-white/10" />

                    {/* PERFIL DO USUÁRIO */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all outline-none group">
                                <div className="relative">
                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600">
                                        <User className="w-5 h-5 text-white" />
                                    </div>

                                    {/* INDICADOR DE STATUS ONLINE */}
                                    <span className="absolute w-3 h-3 bottom-0 right-0 bg-green-500 border-2 border-white dark:border-[#0A0A0B] rounded-full"></span>
                                </div>
                                <div className="hidden md:flex flex-col text-left mr-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                                        {userName ? userName.trim().split(/\s+/)[0] : "Usuário"}
                                    </p>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                        Área de Membros
                                    </p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors hidden md:block" />
                            </button>
                        </DropdownMenuTrigger>
                        
                        {/* DROPDOWN */}
                        <DropdownMenuContent align="end" className="border-none shadow-xl">                            
                            <DropdownMenuLabel className="font-normal px-2 py-3">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        {userName ?? "Usuário"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {userEmail ?? "sem-email@secureone.com"}
                                    </p>
                                </div>
                            </DropdownMenuLabel>

                            {/* SAIR */}
                            <DropdownMenuSeparator className="bg-gray-100 dark:bg-white/5" />
                            <DropdownMenuItem 
                                className="text-red-600 cursor-pointer" 
                                onClick={() => signOut()}
                            >
                                <LogOut className="w-4 h-4" />
                                Encerrar Sessão
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    );
};
/*---- =======================
NAVBAR END -----------------*/