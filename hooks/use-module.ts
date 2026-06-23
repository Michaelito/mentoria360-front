"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getModule } from "@/actions/actions-module";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { normalizeFilters } from "@/utils/normalize-filter";
import type { IModuleResponse } from "@/types/type-module";

// PROPS
type ModuleProps = {
    page: number;
    perPage: number;
    filters: {
        descricao: string;
    };
};

// LISTAR
export function useModule({ page, perPage, filters }: ModuleProps) {
    const normalizedFilters = normalizeFilters(filters); // NORMALIZA OS FILTROS

    return useQuery<IModuleResponse>({
        queryFn: async () => {
            const result = await getModule(page, perPage, normalizedFilters);
            return resolveApiResponse(result);
        },
        queryKey: ["module", page, perPage, normalizedFilters],
        retry: 1,                         // TENTA A REQUISIÇÃO NO MÁXIMO 1 VEZ ANTES DE FALHAR
        refetchOnReconnect: true,         // APENAS BUSCA DE NOVO SE PERDER CONEXÃO
        refetchOnWindowFocus: false,      // EVITA BUSCAR NOVAMENTE AO MUDAR DE ABA
        staleTime: 1000 * 60,             // ATUALIZA OS DADOS A CADA 1 MINUTO
        placeholderData: keepPreviousData // MANTÉM OS DADOS ANTERIORES ENQUANTO A NOVA CONSULTA NÃO FOR COMPLETADA
    });
};