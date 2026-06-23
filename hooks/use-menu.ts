"use client"

import { useQuery } from "@tanstack/react-query";
import { getMenu } from "@/actions/actions-menu";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { IMenuResponse } from "@/types/type-menu";

// LISTAGEM
export function useMenu() {
    return useQuery<IMenuResponse>({
        queryFn: async () => {
            const result = await getMenu();
            return resolveApiResponse(result);
        },
        queryKey: ["menu"],
        retry: 1,                    // TENTA A REQUISIÇÃO NO MÁXIMO 1 VEZ ANTES DE FALHAR
        refetchOnReconnect: true,    // APENAS BUSCA DE NOVO SE PERDER CONEXÃO
        refetchOnWindowFocus: false, // EVITA BUSCAR NOVAMENTE AO MUDAR DE ABA
        staleTime: 1000 * 60         // ATUALIZA OS DADOS A CADA 1 MINUTO
    });
};