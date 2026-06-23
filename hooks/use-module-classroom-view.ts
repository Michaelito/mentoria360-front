"use client"

import { useQuery } from "@tanstack/react-query";
import { getModuleClassroomView } from "@/actions/actions-module-classroom";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import type { IModuleClassroomViewResponse } from "@/types/type-module-classroom";

// PROPS
type ModuleClassroomProps = {
    classroomId: number | null;
};

// VISUALIZAR
export function useModuleClassroomView({ classroomId }: ModuleClassroomProps) {
    return useQuery<IModuleClassroomViewResponse>({
        queryFn: async () => {
            const result = await getModuleClassroomView(classroomId as number);
            return resolveApiResponse(result);
        },
        queryKey: ["module-classroom-view", classroomId],
        enabled: !!classroomId,      // SÓ EXECUTA SE EXISTIR O "ID"
        retry: 1,                    // TENTA A REQUISIÇÃO NO MÁXIMO 1 VEZ ANTES DE FALHAR
        refetchOnReconnect: true,    // APENAS BUSCA DE NOVO SE PERDER CONEXÃO
        refetchOnWindowFocus: false, // EVITA BUSCAR NOVAMENTE AO MUDAR DE ABA
        staleTime: 0                 // ATUALIZA OS DADOS A CADA 1 MINUTO
    });
};