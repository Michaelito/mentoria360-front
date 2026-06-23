"use server"

import { isAxiosError } from "axios";
import { getServerApi } from "@/services/axios-server";
import { ApiResponse } from "@/types/type-api-response";
import { IModuleClassroom, IModuleClassroomResponse, IModuleClassroomViewResponse } from "@/types/type-module-classroom";
import { ModuleClassroomFormData } from "@/types/type-module-classroom-form";
import { MODULE_CLASSROOM_MOCK } from "@/mocks/module-classroom-mock";

// LISTAR
export async function getModuleClassroom(
    moduleId: number,
    page: number,
    perPage: number,
    filters?: Record<string, string>
): Promise<ApiResponse<IModuleClassroomResponse>> {
    try {
        /*
        // CRIA UMA INSTÂNCIA AXIOS SERVER-SIDE
        const api = await getServerApi();
        // console.log("[getModuleClassroom] Parâmetros:", { moduleId, ...filters, perPage, page });

        // FAZ A REQUISIÇÃO
        const response = await api.get<IModuleClassroomResponse>(`/modules/${moduleId}/classrooms`, {
            params: {
                ...filters,
                perPage,
                page
            }
        });
        // console.log("[getModuleClassroom] Resposta da API:", response.data.data.classrooms);
        */

        // DADOS MOCKADOS
        const response = {
            data: {
                ...MODULE_CLASSROOM_MOCK,
                data: MODULE_CLASSROOM_MOCK.data.filter(
                    (classroom) => classroom.moduleId === Number(moduleId)
                )
            }
        };
        console.log("[getModuleClassroom] Parâmetros:", { moduleId, ...filters, perPage, page });

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
export async function getModuleClassroomView(
    classroomId: number
): Promise<ApiResponse<IModuleClassroomViewResponse>> {
    try {
        /*
        // CRIA UMA INSTÂNCIA AXIOS SERVER-SIDE
        const api = await getServerApi();

        // FAZ A REQUISIÇÃO
        const response = await api.get<IModuleClassroomViewResponse>(`/classrooms/${classroomId}`);
        */

        // DADOS MOCKADOS
        const classroom = MODULE_CLASSROOM_MOCK.data.find(
            (item) => item.id === classroomId
        );

        if (!classroom) {
            return {
                type   : "error",
                status : 404,
                message: "Aula não encontrada"
            };
        }

        const response = {
            data: {
                status : true,
                message: "The request has succeeded",
                data   : classroom
            }
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

// SALVAR / EDITAR
export async function saveModuleClassroom(
    data: ModuleClassroomFormData,
    classroomId?: number
): Promise<ApiResponse<IModuleClassroom>> {
    try {
        // CRIA UMA INSTÂNCIA AXIOS JÁ AUTENTICADA
        const api = await getServerApi();

        // FAZ A REQUISIÇÃO
        const response = classroomId
            ? await api.patch(`/classrooms/${classroomId}`, data)
            : await api.post(`/classrooms`, data);

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