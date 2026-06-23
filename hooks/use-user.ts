"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUser } from "@/actions/actions-user";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { normalizeFilters } from "@/utils/normalize-filter";
import type { IUserResponse } from "@/types/type-user";

// PROPS
type UserProps = {
    page: number;
    perPage: number;
    filters: {
        name: string;
        email: string;
    };
};

// LISTAR
export function useUser({ page, perPage, filters }: UserProps) {
    const normalizedFilters = normalizeFilters(filters); // NORMALIZA OS FILTROS

    return useQuery<IUserResponse>({
        queryFn: async () => {
            const result = await getUser(page, perPage, normalizedFilters);
            return resolveApiResponse(result);
        },
        queryKey: ["user", page, perPage, normalizedFilters],
        retry: 1,                         // TENTA A REQUISIÇÃO NO MÁXIMO 1 VEZ ANTES DE FALHAR
        refetchOnReconnect: true,         // APENAS BUSCA DE NOVO SE PERDER CONEXÃO
        refetchOnWindowFocus: false,      // EVITA BUSCAR NOVAMENTE AO MUDAR DE ABA
        staleTime: 1000 * 60,             // ATUALIZA OS DADOS A CADA 1 MINUTO
        placeholderData: keepPreviousData // MANTÉM OS DADOS ANTERIORES ENQUANTO A NOVA CONSULTA NÃO FOR COMPLETADA
    });
};