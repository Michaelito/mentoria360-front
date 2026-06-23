"use server"

import { isAxiosError } from "axios";
import { getServerApi } from "@/services/axios-server";
import { ApiResponse } from "@/types/type-api-response";
import { IModule, IModuleResponse, IModuleViewResponse } from "@/types/type-module";
import { ModuleFormData } from "@/types/type-module-form";
import { MODULE_MOCK } from "@/mocks/module-mock";

// LISTAR
export async function getModule(
    page: number,
    perPage: number,
    filters?: Record<string, string>
): Promise<ApiResponse<IModuleResponse>> {
    try {
        /*
        // CRIA UMA INSTÂNCIA AXIOS SERVER-SIDE
        const api = await getServerApi();
        // console.log("[getModule] Parâmetros:", { ...filters, perPage, page });

        // FAZ A REQUISIÇÃO
        const response = await api.get<IModuleResponse>("/modules", {
            params: {
                ...filters,
                perPage,
                page
            }
        });
        // console.log("[getModule] Resposta da API:", response.data.data.eventos);
        */

        // DADOS MOCKADOS
        const response = {
            data: MODULE_MOCK
        };
        console.log("[getModule] Parâmetros:", { ...filters, perPage, page });

        // RETORNA OS DADOS
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                type   : "error",
                status : error.response?.status ?? 500,
                message: error.response?.data?.message
            };
        }

        // RETORNA O ERRO
        return {
            type  : "error",
            status: 500
        };
    }
};

// VISUALIZAR (ITEM ÚNICO)
export async function getModuleView(
    eventId: number
): Promise<ApiResponse<IModuleViewResponse>> {
    try {
        // CRIA UMA INSTÂNCIA AXIOS JÁ AUTENTICADA
        const api = await getServerApi();

        // FAZ A REQUISIÇÃO
        const response = await api.get<IModuleViewResponse>(`/modules/${eventId}`);
        // console.log("response:", response.data);

        // RETORNA OS DADOS
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                type   : "error",
                status : error.response?.status ?? 500,
                message: error.response?.data?.message
            };
        }

        // RETORNA O ERRO
        return {
            type  : "error",
            status: 500
        };
    }
};

// SALVAR / EDITAR
export async function saveModule(
    data: ModuleFormData,
    eventId?: number
): Promise<ApiResponse<IModule>> {
    try {
        // CRIA UMA INSTÂNCIA AXIOS JÁ AUTENTICADA
        const api = await getServerApi();

        // FAZ A REQUISIÇÃO
        const response = eventId
            ? await api.patch(`/modules/${eventId}`, data)
            : await api.post(`/modules`, data);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                type   : "error",
                status : error.response?.status ?? 500,
                message: error.response?.data?.message
            };
        }

        // RETORNA O ERRO
        return {
            type  : "error",
            status: 500
        };
    }
};