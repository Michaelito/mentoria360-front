"use client"

// import logo from "@/images/logo_light.png";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useMenu } from "@/hooks/use-menu";
import { menuIcons } from "@/utils/mapper-icon";
import { Loader, ErrorMessage } from "@/components/common/Loaders";
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
import type { IMenu } from "@/types/type-menu";

export function Menu() {
    const pathname = usePathname(); // HOOK-PATHNAME

    // HOOK-REACT-QUERY
    const {
        data,
        error,
        isError,
        isLoading,
        isFetching
    } = useMenu();

    // EXTRAÇÃO DE DADOS
    const menu = data?.data ?? [];

    // FUNÇÃO PARA VERIFICAR SE O PATH ATUAL ESTÁ ATIVO
    function isActiveRoute(item: IMenu) {
        if (!item.url) return false;

        // VERIFICA IGUALDADE EXATA OU SUB-ROTA
        return pathname === item.url || pathname.startsWith(`${item.url}/`);
    };

    // FUNÇÃO PARA DESTACAR O PAI SE ALGUM FILHO ESTIVER ATIVO
    function isParentActive(item: IMenu) {
        if (isActiveRoute(item)) return true;

        return item.children?.some((child) => isActiveRoute(child)) ?? false;
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="bg-white dark:bg-[#0A0A0B] h-17 flex items-center justify-center">
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

            {/* MENU */}
            <SidebarContent className="bg-white dark:bg-[#0A0A0B]">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] text-slate-400 uppercase tracking-[0.18em] mb-2">
                        Conhecimento
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isError ? (
                                <ErrorMessage
                                    message={
                                        error instanceof Error
                                            ? error.message
                                            : "Não foi possível carregar os dados."
                                    }
                                />
                            ) : isLoading || isFetching ? (
                                <Loader />
                            ) : (
                                menu.map((item) => {
                                    const hasChildren =
                                        !!item.children?.length; // VERIFICA SE O ITEM POSSUI FILHOS

                                    const active =
                                        isParentActive(item); // VERIFICA SE O ITEM ATUAL ESTÁ ATIVO

                                    const Icon =
                                        item.icon
                                            ? menuIcons[item.icon]
                                            : null; // OBTÉM O ÍCONE CORRESPONDENTE, SE EXISTIR

                                    // MENU (SIMPLES)
                                    if (!hasChildren) {
                                        return (
                                            <SidebarMenuItem key={item.id}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className={`
                                                        h-8 rounded-lg
                                                        ${
                                                            active
                                                                ? "bg-indigo-50/50 dark:bg-indigo-600 text-indigo-600 dark:text-white"
                                                                : "text-gray-400 hover:bg-white/5"
                                                        }
                                                    `}
                                                >
                                                    <Link
                                                        href={item.url ?? "#"}
                                                        className="flex items-center gap-3"
                                                    >
                                                        {Icon && (
                                                            <Icon className="h-4 w-4 shrink-0" />
                                                        )}
                                                        <span>
                                                            {item.label}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    }

                                    // MENU (SUB-MENU)
                                    return (
                                        <Collapsible
                                            key={item.id}
                                            defaultOpen={active}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger
                                                    className="cursor-pointer"
                                                    asChild
                                                >
                                                    <SidebarMenuButton
                                                        className={`
                                                            h-8 rounded-lg flex items-center gap-3
                                                            ${
                                                                active
                                                                    ? "bg-blue-600 text-white"
                                                                    : "text-white hover:bg-white/5 hover:text-white"
                                                            }
                                                        `}
                                                    >
                                                        {Icon && (
                                                            <Icon className="h-4 w-4 shrink-0" />
                                                        )}

                                                        <span className="font-medium">
                                                            {item.label}
                                                        </span>

                                                        <ChevronDown
                                                            className="
                                                                ml-auto h-4 w-4 transition-transform duration-200
                                                                group-data-[state=open]/collapsible:rotate-180
                                                            "
                                                        />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>

                                                {/* SUB-MENUS */}
                                                <CollapsibleContent className="transition-all">
                                                    <div className="flex flex-col border-l border-white/40 mt-2 ml-4 pl-2 gap-1">
                                                        {item.children?.map(
                                                            (subItem) => {
                                                                const subActive =
                                                                    isActiveRoute(
                                                                        subItem
                                                                    ); // VERIFICA SE O ITEM ATUAL ESTÁ ATIVO

                                                                return (
                                                                    <Link
                                                                        key={
                                                                            subItem.id
                                                                        }
                                                                        href={
                                                                            subItem.url ??
                                                                            "#"
                                                                        }
                                                                        className={`
                                                                            h-8 px-3 flex items-center rounded-lg text-sm transition-colors
                                                                            ${
                                                                                subActive
                                                                                    ? "text-blue-600 font-semibold bg-white/80"
                                                                                    : "text-white hover:bg-white/10"
                                                                            }
                                                                        `}
                                                                    >
                                                                        {
                                                                            subItem.label
                                                                        }
                                                                    </Link>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                })
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};