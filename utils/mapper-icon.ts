import {
    LayoutDashboard,
    GraduationCap,
    Heart,
    Lock,
    BrainCircuit,
    Sparkles,
    Bot,
    Code2,
    type LucideIcon
} from "lucide-react";
import type { IMenuIcon } from "@/types/type-menu";
import type { IModuleIcon } from "@/types/type-module";

// MAPA DE ÍCONES (SIDEBAR)
export const menuIcons: Record<IMenuIcon, LucideIcon> = {
    LayoutDashboard,
    GraduationCap,
    Heart,
    Lock
};

// MAPA DE ÍCONES (MÓDULOS)
export const moduleIcons: Record<IModuleIcon, LucideIcon> = {
    BrainCircuit,
    Sparkles,
    Bot,
    Code2
};