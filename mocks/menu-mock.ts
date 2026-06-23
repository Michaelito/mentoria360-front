import type { IMenuResponse } from "@/types/type-menu";

// MENU
export const MENU_SIDEBAR_MOCK: IMenuResponse = {
    status : true,
    message: "The request has succeeded",
    data: [
        {
            id: 1,
            url: "/academy/home",
            icon: "LayoutDashboard",
            label: "Home"
        },
        {
            id: 2,
            url: "/academy/modules",
            icon: "GraduationCap",
            label: "Trilha de Aprendizado"
        },
        {
            id: 3,
            url: "/academy/favorites",
            icon: "Heart",
            label: "Meus Favoritos"
        }
    ]
};