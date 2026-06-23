"use client"

import { useQuery } from "@tanstack/react-query";
import { getModuleView } from "@/actions/actions-module";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import type { IModuleViewResponse } from "@/types/type-module";

// PROPS
type ModuleViewProps = {
    moduleId?: number;
};

// VISUALIZAR
export function useModuleView({ moduleId }: ModuleViewProps) {
    return useQuery<IModuleViewResponse>({
        queryFn: async () => {
            const result = await getModuleView(moduleId as number);
            return resolveApiResponse(result);
        },
        queryKey: ["module-view", moduleId],
        enabled: !!moduleId,         // SÓ EXECUTA SE EXISTIR O "ID"
        retry: 1,                    // TENTA A REQUISIÇÃO NO MÁXIMO 1 VEZ ANTES DE FALHAR
        refetchOnReconnect: true,    // APENAS BUSCA DE NOVO SE PERDER CONEXÃO
        refetchOnWindowFocus: false, // EVITA BUSCAR NOVAMENTE AO MUDAR DE ABA
        staleTime: 0                 // ATUALIZA OS DADOS A CADA 1 MINUTO
    });
};