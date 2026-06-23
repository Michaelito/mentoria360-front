"use client"

import axios from "axios";
import { AxiosError } from "axios";

/**
 * CRIA UMA INSTÂNCIA AXIOS JÁ AUTENTICADA PARA USO CLIENT-SIDE
 * DEVE SER CHAMADA DENTRO DE CLIENT ACTIONS
 */
export const getClientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_BASE,
    headers: {
        "Content-Type": "application/json",
        "X-Tenant-Id" : process.env.NEXT_PUBLIC_TENANT_TOKEN
    }
});

// INTERCEPTOR
getClientApi.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        return Promise.reject(error);
    }
);