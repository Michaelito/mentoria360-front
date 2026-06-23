import { ApiResponse } from "@/types/type-api-response";
import { ApiBusinessError, ApiTechnicalError } from "@/utils/api-error";

// ERROS TÉCNICOS
const TECHNICAL_ERRORS = [401, 403, 429, 502, 503, 504];

// MENSAGENS QUE INDICAM FALHA DE AUTENTICAÇÃO
const INVALID_TOKEN_MESSAGES = [
    "invalid token",
    "token inválido",
    "jwt malformed",
    "jwt expired",
    "unauthorized",
    "unauthenticated"
];

// VERIFICA SE A MENSAGEM INDICA FALHA DE AUTENTICAÇÃO
function isInvalidTokenMessage(message?: string) {
    if (!message) return false;

    const normalized = message.trim().toLowerCase();
    return INVALID_TOKEN_MESSAGES.includes(normalized);
};

// RESOLVE API RESPONSE
export function resolveApiResponse<T>(response: ApiResponse<T>): T {
    if (response.type === "error") {
        const isTechnicalStatus = TECHNICAL_ERRORS.includes(response.status);
        const isInvalidToken = isInvalidTokenMessage(response.message);

        // TRATA TOKEN INVÁLIDO COMO ERRO TÉCNICO/AUTENTICAÇÃO
        if (isTechnicalStatus || isInvalidToken) {
            // FORÇA 401 PARA O FLUXO DE AUTENTICAÇÃO,
            // MESMO QUANDO A API RESPONDEU 400
            const status = isInvalidToken ? 401 : response.status;
            throw new ApiTechnicalError(status, response.message);
        }

        // ERROS DE NEGÓCIO
        throw new ApiBusinessError(response.message || "Erro de negócio.");
    }

    // RETORNA OS DADOS
    return response.data;
};