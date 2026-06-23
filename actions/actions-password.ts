"use client"

import axios from "axios";
import { getClientApi } from "@/services/axios-client";
import { toApiErrorClient } from "@/utils/api-error";
import type { ApiResponse } from "@/types/type-api-response";
import type { IVerifyCodeForgotPasswordPayload, ForgotPasswordFormData, ChangePasswordFormData } from "@/types/type-password";

// ENVIA O E-MAIL
export async function changePassword(
    data: ChangePasswordFormData
): Promise<ApiResponse<{ message: string }>> {
    try {
        // console.log("[changePassword] Payload enviado:", data);

        // FAZ A REQUISIÇÃO
        const response = await getClientApi.post("/auth/change-password", data);
        // console.log("[changePassword] Status:", response.status);
        // console.log("[changePassword] Resposta da API:", response.data);

        // RETORNO DA REQUISIÇÃO
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.error("[changePassword] Axios error message:", error.message);
            // console.error("[changePassword] Axios error code:", error.code);
            // console.error("[changePassword] Axios error status:", error.response?.status);
            // console.error("[changePassword] Axios error response data:", error.response?.data);
            // console.error("[changePassword] Axios error headers:", error.response?.headers);
            // console.error("[changePassword] Axios error config url:", error.config?.url);
            // console.error("[changePassword] Axios error config baseURL:", error.config?.baseURL);
            // console.error("[changePassword] Axios error config data:", error.config?.data);
        } else {
            // console.error("[changePassword] Erro desconhecido:", error);
        }
        return toApiErrorClient(error);
    }
};

// ENVIA O E-MAIL
export async function sendEmail(
    data: ForgotPasswordFormData
): Promise<ApiResponse<{ message: string }>> {
    try {
        // console.log("[sendEmail] Payload enviado:", data);

        // FAZ A REQUISIÇÃO
        const response = await getClientApi.post<{ message: string }>("/auth/forgot-password", data);
        // console.log("[sendEmail] Status:", response.status);
        // console.log("[sendEmail] Resposta da API:", response.data);

        // RETORNO DA REQUISIÇÃO
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.error("[sendEmail] Axios error message:", error.message);
            // console.error("[sendEmail] Axios error code:", error.code);
            // console.error("[sendEmail] Axios error status:", error.response?.status);
            // console.error("[sendEmail] Axios error response data:", error.response?.data);
            // console.error("[sendEmail] Axios error headers:", error.response?.headers);
            // console.error("[sendEmail] Axios error config url:", error.config?.url);
            // console.error("[sendEmail] Axios error config baseURL:", error.config?.baseURL);
            // console.error("[sendEmail] Axios error config data:", error.config?.data);
        } else {
            // console.error("[sendEmail] Erro desconhecido:", error);
        }
        return toApiErrorClient(error);
    }
};

// VERIFICA O CÓDIGO
export async function verifyCode(
    data: IVerifyCodeForgotPasswordPayload
): Promise<ApiResponse<{ message: string }>> {
    try {
        // console.log("[verifyCode] Payload enviado:", data);

        // FAZ A REQUISIÇÃO
        const response = await getClientApi.post<{ message: string }>("/auth/verify-code-forgot-password", data);
        // console.log("[verifyCode] Status:", response.status);
        // console.log("[verifyCode] Resposta da API:", response.data);

        // RETORNO DA REQUISIÇÃO
        return {
            type: "success",
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.error("[verifyCode] Axios error message:", error.message);
            // console.error("[verifyCode] Axios error code:", error.code);
            // console.error("[verifyCode] Axios error status:", error.response?.status);
            // console.error("[verifyCode] Axios error response data:", error.response?.data);
            // console.error("[verifyCode] Axios error headers:", error.response?.headers);
            // console.error("[verifyCode] Axios error config url:", error.config?.url);
            // console.error("[verifyCode] Axios error config baseURL:", error.config?.baseURL);
            // console.error("[verifyCode] Axios error config data:", error.config?.data);
        } else {
            // console.error("[verifyCode] Erro desconhecido:", error);
        }
        return toApiErrorClient(error);
    }
};