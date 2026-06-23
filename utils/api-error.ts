import { isAxiosError } from "axios";
import { ApiResponse } from "@/types/type-api-response";

// TYPE
type ErrorResponseObject = {
    message?: string;
    error?: {
        code?: string;
        message?: string;
    } | string;
    status?: boolean | number | string;
};

type ErrorResponseData =
    | ErrorResponseObject
    | string
    | null
    | undefined;

/* EXTRAI A MELHOR MENSAGEM POSSÍVEL DO ERRO */
function extractApiErrorMessage(data: ErrorResponseData, fallback?: string) {
    // STRING PURA
    if (typeof data === "string") {
        return data;
    }

    // OBJETO
    if (data && typeof data === "object") {
        const errorMessage =
            typeof data.error === "object"
                ? data.error?.message
                : typeof data.error === "string"
                    ? data.error
                    : undefined;

        const errorCode =
            typeof data.error === "object"
                ? data.error?.code
                : undefined;

        // RATE LIMIT
        if (errorCode === "TOO_MANY_REQUESTS") {
            return data.message ||
                errorMessage ||
                "Limite de requisições atingido. Tente novamente em instantes.";
        }

        return (
            data.message ||
            errorMessage ||
            fallback ||
            "Erro na requisição."
        );
    }

    return fallback || "Erro na requisição.";
}

// CLIENT SIDE - CONVERTE ERRO PARA API RESPONSE
export function toApiErrorClient(error: unknown): ApiResponse<never> {
    if (isAxiosError(error)) {
        const status = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponseData;

        // MENSAGEM
        const message = extractApiErrorMessage(data, error.message);

        // RETORNA O ERRO
        return {
            type: "error",
            status,
            message
        };
    }

    // ERRO INTERNO
    if (error instanceof Error) {
        return {
            type: "error",
            status: 500,
            message: error.message || "Erro interno do servidor."
        };
    }

    // RETORNA O ERRO
    return {
        type: "error",
        status: 500,
        message: "Erro interno do servidor."
    };
};

// SERVER SIDE - CONVERTE ERRO PARA API RESPONSE
export function toApiErrorServer(error: unknown): ApiResponse<never> {
    if (isAxiosError(error)) {
        const status = error.response?.status ?? 500;
        const data = error.response?.data as ErrorResponseData;

        return {
            type: "error",
            status,
            message: extractApiErrorMessage(data, error.message)
        };
    }

    // RETORNA O ERRO
    return {
        type: "error",
        status: 500,
        message: "Erro interno do servidor."
    };
};

// ERRO TÉCNICO
export class ApiTechnicalError extends Error {
    public status: number;

    constructor(status: number, message?: string) {
        super(message || "Erro técnico da API.");
        this.name = "ApiTechnicalError";
        this.status = status;
    }
};

// ERRO DE NEGÓCIO
export class ApiBusinessError extends Error {
    constructor(message?: string) {
        super(message || "Erro de negócio.");
        this.name = "ApiBusinessError";
    }
};