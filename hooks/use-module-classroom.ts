"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getModuleClassroom } from "@/actions/actions-module-classroom";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { normalizeFilters } from "@/utils/normalize-filter";
import type { IModuleClassroomResponse } from "@/types/type-module-classroom";

// PROPS
type ModuleClassroomProps = {
    moduleId: number;
    page: number;
    perPage: number;
    filters: {
        descricao: string;
    };
};

// LISTAR
export function useModuleClassroom({ moduleId, page, perPage, filters }: ModuleClassroomProps) {
    const normalizedFilters = normalizeFilters(filters); // NORMALIZA OS FILTROS

    return useQuery<IModuleClassroomResponse>({
        queryFn: async () => {
            const result = await getModuleClassroom(moduleId, page, perPage, normalizedFilters);
            return resolveApiResponse(result);
        },
        queryKey: ["module-classroom", moduleId, page, perPage, normalizedFilters],
        enabled: !!moduleId,              // SÓ EXECUTA SE EXISTIR O "ID"
        retry: 1,                         // TENTA A REQUISIÇÃO NO MÁXIMO 1 VEZ ANTES DE FALHAR
        refetchOnReconnect: true,         // APENAS BUSCA DE NOVO SE PERDER CONEXÃO
        refetchOnWindowFocus: false,      // EVITA BUSCAR NOVAMENTE AO MUDAR DE ABA
        staleTime: 1000 * 60,             // ATUALIZA OS DADOS A CADA 1 MINUTO
        placeholderData: keepPreviousData // MANTÉM OS DADOS ANTERIORES ENQUANTO A NOVA CONSULTA NÃO FOR COMPLETADA
    });
};