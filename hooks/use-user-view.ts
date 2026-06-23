"use client"

import { useQuery } from "@tanstack/react-query";
import { getUserView } from "@/actions/actions-user";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import type { IUserViewResponse } from "@/types/type-user";

// PROPS
type UserViewProps = {
    userId: number | undefined;
};

// VISUALIZAR
export function useUserView({ userId }: UserViewProps) {
    return useQuery<IUserViewResponse>({
        queryFn: async () => {
            const result = await getUserView(userId as number);
            return resolveApiResponse(result);
        },
        queryKey: ["user-view", userId],
        enabled: !!userId,        // SÓ EXECUTA SE EXISTIR O "ID"
        retry: 1,                 // TENTA A REQUISIÇÃO NO MÁXIMO 1 VEZ ANTES DE FALHAR
        refetchOnReconnect: true, // APENAS BUSCA DE NOVO SE PERDER CONEXÃO
        refetchOnWindowFocus: false, // EVITA BUSCAR NOVAMENTE AO MUDAR DE ABA
        staleTime: 0              // SEM CACHE PARA DADOS INDIVIDUAIS
    });
};