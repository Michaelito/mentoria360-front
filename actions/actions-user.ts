"use server"

import { getServerApi } from "@/services/axios-server";
import { toApiErrorServer } from "@/utils/api-error";
import type { ApiResponse } from "@/types/type-api-response";
import type { IUser, IUserResponse, IUserViewResponse } from "@/types/type-user";
import type { CreateUserFormData, UpdateUserFormData } from "@/types/type-user-form";

// LISTAR
export async function getUser(
    page: number,
    perPage: number,
    filters?: Record<string, string>
): Promise<ApiResponse<IUserResponse>> {
    try {
        // CRIA UMA INSTÂNCIA AXIOS SERVER-SIDE
        const api = await getServerApi();
        // console.log("[getUser] Parâmetros:", { ...filters, perPage, page });

        // FAZ A REQUISIÇÃO
        const response = await api.get<IUserResponse>("/users", {
            params: {
                ...filters,
                perPage,
                page
            }
        });
        // console.log("[getUser] Resposta da API:", response.data);

        // RETORNO DA REQUISIÇÃO
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        // console.error("[getUser] Erro:", error);
        return toApiErrorServer(error);
    }
};

// VISUALIZAR
export async function getUserView(
    userId: number
): Promise<ApiResponse<IUserViewResponse>> {
    try {
        // CRIA UMA INSTÂNCIA AXIOS JÁ AUTENTICADA
        const api = await getServerApi();
        // console.log("[getUserView] userId:", userId);

        // FAZ A REQUISIÇÃO
        const response = await api.get<IUserViewResponse>(`/users/${userId}`);
        // console.log("[getUserView] Resposta da API:", response.data);

        // RETORNO DA REQUISIÇÃO
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        // console.error("[getUserView] Erro:", error);
        return toApiErrorServer(error);
    }
};

// SALVAR / EDITAR
export async function saveUser(
    data: CreateUserFormData | UpdateUserFormData,
    userId?: number
): Promise<ApiResponse<IUser>> {
    try {
        // CRIA UMA INSTÂNCIA AXIOS JÁ AUTENTICADA
        const api = await getServerApi();
        // console.log("[saveUser] userId:", userId);
        // console.log("[saveUser] Payload recebido pela server action:", data);

        // FAZ A REQUISIÇÃO
        const response = userId
            ? await api.patch<IUser>(`/users/${userId}`, data)
            : await api.post<IUser>("/users", data);
        // console.log("[saveUser] Resposta da API:", response.data);

        // RETORNO DA REQUISIÇÃO
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        // console.error("[saveUser] Erro ao enviar para API:", error);
        return toApiErrorServer(error);
    }
};