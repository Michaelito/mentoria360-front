"use client"

// import logo from "@/images/logo_light.png";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { menu } from "@/config/app-menu";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import type { ISidebarItem } from "@/types/type-sidebar";

// PROPS
type MenuProps = {
    userProfile: number;
};

export function Menu({ userProfile }: MenuProps) {
    const pathname = usePathname(); // HOOK-PATHNAME

    // FUNÇÃO PARA FILTRAR O MENU DE ACORDO COM O PERFIL DO USUÁRIO
    const filteindigoMenu = menu
        .filter((item) => !item.profiles || item.profiles.includes(userProfile))
        .map((item) => ({
            ...item,
            children: item.children?.filter(
                (child) =>
                    !child.profiles ||
                    child.profiles.includes(userProfile)
            )
        }))
        .filter(
            (item) =>
                !item.children ||
                item.children.length > 0
        );

    // FUNÇÃO PARA VERIFICAR SE O PATH ATUAL ESTÁ ATIVO
    function isActiveRoute(itemUrl?: string) {
        if (!itemUrl) return false;
        // VERIFICA IGUALDADE EXATA OU SE É UMA SUB-ROTA
        return pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);
    };

    // FUNÇÃO PARA DESTACAR O PAI SE ALGUM FILHO ESTIVER ATIVO
    function isParentActive(item: ISidebarItem) {
        if (isActiveRoute(item.url)) return true;
        return item.children?.some((child) => isActiveRoute(child.url));
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-17 bg-indigo-800 dark:bg-[#0A0A0B] flex items-center justify-center">
                {/*
                <Image
                    src={logo}
                    width={120}
                    height={28}
                    alt="logo-light"
                    className="w-auto h-10 object-contain brightness-0 invert"
                    priority
                />
                */}
            </SidebarHeader>

            {/* SIDEBAR */}
            <SidebarContent className="bg-indigo-800 dark:bg-[#0A0A0B]">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] text-slate-400 uppercase tracking-[0.18em] mb-2">
                        Conhecimento
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteindigoMenu.map((item) => {
                                const hasChildren = !!(item.children && item.children.length > 0); // VERIFICA SE O ITEM POSSUI FILHOS
                                const active = isParentActive(item); // VERIFICA SE O ITEM ATUAL ESTÁ ATIVO

                                // MENU (SIMPLES)
                                if (!hasChildren) {
                                    return (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton
                                                asChild
                                                className={`
                                                    h-8 rounded-lg
                                                    ${active 
                                                        ? "bg-indigo-600 text-white" 
                                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                                    }
                                                `}
                                            >
                                                <Link href={item.url ?? "#"} className="flex items-center gap-3">
                                                    {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                                                    <span className="font-medium">
                                                        {item.label}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }

                                // MENU (SUB-MENU)
                                return (
                                    <Collapsible key={item.id} defaultOpen={active} className="group/collapsible">
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger className="cursor-pointer" asChild>
                                                <SidebarMenuButton 
                                                    className={`
                                                        h-8 rounded-lg flex items-center gap-3
                                                        ${active 
                                                            ? "bg-indigo-600 text-white" 
                                                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                                        }
                                                    `}
                                                >
                                                    {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                                                    <span className="font-medium">
                                                        {item.label}
                                                    </span>
                                                    <ChevronDown
                                                        className={`
                                                            ml-auto h-4 w-4 transition-transform duration-200
                                                            group-data-[state=open]/collapsible:rotate-180
                                                        `}
                                                    />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            
                                            {/* SUB-MENUS */}
                                            <CollapsibleContent className="transition-all">
                                                <div className="flex flex-col border-l border-white/10 mt-2 ml-4 pl-2 gap-1">
                                                    {item.children?.map((subItem) => {
                                                        const subActive = isActiveRoute(subItem.url); // VERIFICA SE O ITEM ATUAL ESTÁ ATIVO
                                                        
                                                        return (
                                                            <Link 
                                                                key={subItem.id}
                                                                href={subItem.url ?? "#"}
                                                                className={`
                                                                    h-8 px-3 flex items-center rounded-lg text-sm transition-colors
                                                                    ${subActive
                                                                        ? "text-indigo-500 font-semibold bg-indigo-500/5"
                                                                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                                                                    }
                                                                `}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};