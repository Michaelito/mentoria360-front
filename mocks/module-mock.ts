import type { IModuleResponse } from "@/types/type-module";

// MODULES
export const MODULE_MOCK: IModuleResponse = {
    status : true,
    message: "The request has succeeded",
    data: [
        {
            id: 1,
            title: "Starter",
            slug: "starter",
            subtitle: "Introdução à Inteligência Artificial",
            description: "Entenda IA de verdade. Aprenda o que são LLMs, prompts, agentes e como aplicar inteligência artificial no dia a dia.",
            thumbnail: "starter.webp",
            thumbnailUrl: "/images/modules/starter.webp",
            icon: "BrainCircuit",
            color: "indigo",
            level: "Nível 01 · Fundamentos",
            order: 1,
            progress: 100,
            estimatedTime: 180,
            totalLessons: 12,
            status: 1,
            featured: true,
            createdAt: "2026-06-01T08:00:00.000Z",
            updatedAt: "2026-06-15T10:30:00.000Z"
        },
        {
            id: 2,
            title: "Prompts",
            slug: "prompts",
            subtitle: "Prompt Engineering",
            description: "Domine técnicas para criar prompts claros, eficientes e reutilizáveis para diferentes ferramentas de IA.",
            thumbnail: "prompts.webp",
            thumbnailUrl: "/images/modules/prompts.webp",
            icon: "Sparkles",
            color: "violet",
            level: "Nível 02 · Prompt Engineering",
            order: 2,
            progress: 45,
            estimatedTime: 240,
            totalLessons: 18,
            status: 1,
            featured: true,
            createdAt: "2026-06-02T08:00:00.000Z",
            updatedAt: "2026-06-15T10:30:00.000Z"
        },
        {
            id: 3,
            title: "Agents",
            slug: "agents",
            subtitle: "Agentes Inteligentes",
            description: "Crie fluxos inteligentes com automações, agentes autônomos, integrações e ferramentas conectadas.",
            thumbnail: "agents.webp",
            thumbnailUrl: "/images/modules/agents.webp",
            icon: "Bot",
            color: "orange",
            level: "Nível 03 · Automação",
            order: 3,
            progress: 0,
            estimatedTime: 300,
            totalLessons: 22,
            status: 0,
            featured: false,
            createdAt: "2026-06-03T08:00:00.000Z",
            updatedAt: "2026-06-15T10:30:00.000Z"
        },
        {
            id: 4,
            title: "Builder",
            slug: "builder",
            subtitle: "Desenvolvimento com IA",
            description: "Use IA para acelerar desenvolvimento, construir interfaces, APIs, dashboards e produtos digitais.",
            thumbnail: "builder.webp",
            thumbnailUrl: "/images/modules/builder.webp",
            icon: "Code2",
            color: "slate",
            level: "Nível 04 · Código + IA",
            order: 4,
            progress: 0,
            estimatedTime: 360,
            totalLessons: 28,
            status: 2,
            featured: false,
            createdAt: "2026-06-04T08:00:00.000Z",
            updatedAt: "2026-06-15T10:30:00.000Z"
        }
    ],
    pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 4
    }
};