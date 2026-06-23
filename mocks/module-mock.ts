import type { IModuleResponse } from "@/types/type-module";

// MODULES
export const MODULE_MOCK: IModuleResponse = {
    status : true,
    message: "The request has succeeded",
    data: [
        {
            id: 1,
            level: "Nível 01 · Fundamentos",
            title: "Starter",
            description: "Entenda IA de verdade. Aprenda o que são LLMs, prompts, agentes e como aplicar inteligência artificial no dia a dia.",
            status: "Disponível",
            progress: 100,
            icon: "BrainCircuit",
            active: true,
            color: "indigo"
        },
        {
            id: 2,
            level: "Nível 02 · Prompt Engineering",
            title: "Prompts",
            description: "Domine técnicas para criar prompts claros, eficientes e reutilizáveis para diferentes ferramentas de IA.",
            status: "Disponível",
            progress: 45,
            icon: "Sparkles",
            active: true,
            color: "violet"
        },
        {
            id: 3,
            level: "Nível 03 · Automação",
            title: "Agents",
            description: "Crie fluxos inteligentes com automações, agentes autônomos, integrações e ferramentas conectadas.",
            status: "Começar agora",
            progress: 0,
            icon: "Bot",
            active: true,
            color: "orange"
        },
        {
            id: 4,
            level: "Nível 04 · Código + IA",
            title: "Builder",
            description: "Use IA para acelerar desenvolvimento, construir interfaces, APIs, dashboards e produtos digitais.",
            status: "Bloqueado",
            progress: 0,
            icon: "Code2",
            active: false,
            color: "slate"
        }
    ],
    pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 5
    }
};