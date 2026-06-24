import { LucideIcon } from "lucide-react";

// SIDEBAR
export type ISidebarItem = {
    id: number;
    icon?: LucideIcon;
    label: string;
    url? : string;
    profiles?: number[];
    children?: ISidebarItem[];
};