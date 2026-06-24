import { LayoutDashboard, UserLock, Layers, GraduationCap, Heart } from "lucide-react";
import { ISidebarItem } from "@/types/type-sidebar";

// MENU
export const menu: ISidebarItem[] = [
    // ADMIN
    {
        id: 1,
        url: "/admin/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        profiles: [1]
    },
    {
        id: 2,
        url: "/admin/modules",
        icon: Layers,
        label: "Módulos",
        profiles: [1]
    },
    {
        id: 3,
        url: "/admin/users",
        icon: UserLock,
        label: "Usuários",
        profiles: [1]
    },

    // ACADEMY
    {
        id: 4,
        url: "/academy/home",
        icon: LayoutDashboard,
        label: "Home",
        profiles: [2]
    },
    {
        id: 5,
        url: "/academy/modules",
        icon: GraduationCap,
        label: "Trilha de Aprendizado",
        profiles: [2]
    },
    {
        id: 6,
        url: "/academy/favorites",
        icon: Heart,
        label: "Meus Favoritos",
        profiles: [2]
    }
];