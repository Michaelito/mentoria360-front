"use client"

import { ERROR_PAGE_MAP } from "@/types/type-api-error-map";

// REDIRECIONA PARA PÁGINA DE ERRO
const REDIRECT_FLAG = "api_error_redirecting";

export function handleApiError(status: keyof typeof ERROR_PAGE_MAP) {
    // PEGA O ERRO
    const error = ERROR_PAGE_MAP[status];

    // VERIFICA SE O ERRO FOI MAPEADO
    if (!error) {
        console.error("Erro de API não mapeado:", status);
        return;
    }

    // VERIFICA SE O ERRO JA FOI REDIRECIONADO (EVITA MÚLTIPLOS REDIRECTS SIMULTÂNEOS)
    if (sessionStorage.getItem(REDIRECT_FLAG)) return;

    // MARCA O ERRO COMO REDIRECIONADO
    sessionStorage.setItem(REDIRECT_FLAG, "true");

    // PARÂMETROS DO ERRO
    const params = new URLSearchParams({
        title      : error.title,
        description: error.description,
        status     : String(error.status),
        logout     : String(Boolean(error.logout))
    });

    // REDIRECIONA PARA A PÁGINA DE ERRO
    window.location.assign(`/status?${params.toString()}`);
};