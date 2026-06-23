import { LucideIcon } from "lucide-react";

// SIDEBAR
export type INavbarItem = {
    id: number;
    icon?: LucideIcon;
    label: string;
    url? : string;
    children?: INavbarItem[];
};