// ERROR MAP
export type ErrorPageConfig = {
    status: number;
    title: string;
    description: string;
    logout?: boolean;
};

export const ERROR_PAGE_MAP: Record<number, ErrorPageConfig> = {
    400: {
        status: 400,
        title: "Sessão expirada",
        description: "Sua sessão expirou. Faça login novamente.",
        logout: true
    },
    401: {
        status: 401,
        title: "Sessão expirada",
        description: "Sua sessão expirou. Faça login novamente.",
        logout: true
    },
    403: {
        status: 403,
        title: "Acesso negado",
        description: "Você não tem permissão para acessar este recurso."
    },
    500: {
        status: 500,
        title: "Erro interno do servidor",
        description: "Algo deu errado no servidor. Tente novamente mais tarde."
    },
    502: {
        status: 502,
        title: "Gateway inválido",
        description: "Resposta inválida de outro serviço."
    },
    503: {
        status: 503,
        title: "Serviço indisponível",
        description: "O servidor está temporariamente indisponível."
    },
    504: {
        status: 504,
        title: "Tempo de espera esgotado",
        description: "A requisição excedeu o tempo limite."
    }
};