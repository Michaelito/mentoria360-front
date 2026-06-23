"use server"

import { isAxiosError } from "axios";
// import { getServerApi } from "@/services/axios-server";
import { ApiResponse } from "@/types/type-api-response";
import { IMenuResponse } from "@/types/type-menu";
import { MENU_SIDEBAR_MOCK } from "@/mocks/menu-mock";

// LISTAR MENU
export async function getMenu(): Promise<ApiResponse<IMenuResponse>> {
    try {
        /*
        // CRIA UMA INSTÂNCIA AXIOS SERVER-SIDE
        const api = await getServerApi();

        // FAZ A REQUISIÇÃO
        const response = await api.get<IMenuResponse>("/menu");
        // console.log("[getMenu] Resposta da API:", response.data.data);
        */

        // DADOS MOCKADOS
        const response = {
            data: MENU_SIDEBAR_MOCK
        };

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