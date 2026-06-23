import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthResponse, AuthResponseJwtDecoded } from "@/types/type-login";
import type { NextAuthOptions } from "next-auth";

// USERS-MOCK
const USERS_MOCK = [
    {
        id      : 1,
        name    : "Administrador",
        login   : "admin@email.com",
        password: "123456",
        role    : "admin"
    },
    {
        id      : 2,
        name    : "Usuário",
        login   : "user@email.com",
        password: "123456",
        role    : "user"
    }
];

/*---- =======================
NEXT-AUTH START ------------*/
export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                login: {
                    label: "Email",
                    type: "text"
                },
                password: {
                    label: "Senha",
                    type: "password"
                }
            },

            // AUTHORIZER-MOCK
            async authorize(credentials) {
                // VALIDA AS CREDENCIAIS
                if (!credentials?.login || !credentials?.password) {
                    return null;
                }

                // PROCURA USUÁRIO MOCKADO
                const user = USERS_MOCK.find(
                    u =>
                        u.login === credentials.login &&
                        u.password === credentials.password
                );

                // 🔹 USUÁRIO NÃO ENCONTRADO
                if (!user) {
                    return null;
                }

                // 🔹 SIMULA O JWT QUE O BACKEND RETORNARIA
                const accessToken = jwt.sign(
                    {
                        id   : user.id,
                        role : user.role,
                        login: user.login,
                        name : user.name
                    },
                    process.env.NEXTAUTH_SECRET!,
                    {
                        expiresIn: "24h"
                    }
                );

                // DECODIFIQUE O TOKEN
                const decoded = jwt.decode(accessToken) as AuthResponseJwtDecoded;
                return {
                    id         : String(user.id),
                    name       : user.name,
                    login      : user.login,
                    role       : user.role,
                    accessToken,
                    dtExpired  : String(decoded.exp)
                };
            }

            /*
            // AUTHORIZER
            async authorize(credentials) {
                // console.log("authorize chamado");
                // console.log("credentials recebidas:", credentials);

                // VALIDA AS CREDENCIAIS
                if (!credentials?.login || !credentials?.password) {
                    // console.log("nenhuma credencial recebida");
                    return null;
                }

                // FAZ A REQUISIÇÃO
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Tenant-Id": process.env.NEXT_PUBLIC_TENANT_TOKEN as string
                        },
                        body: JSON.stringify({
                            login: credentials?.login,
                            password: credentials?.password
                        })
                    });
                    // console.log("status da resposta:", res.status);

                    // VERIFIQUE SE A REQUISIÇÃO FALHOU
                    if (!res.ok) {
                        // console.log("login inválido — resposta sem token");
                        return null;
                    }

                    // LEIA A RESPOSTA
                    const data: AuthResponse = await res.json();

                    // VERIFIQUE SE EXISTE O TOKEN
                    if (!data?.token) return null;

                    // DECODIFIQUE O TOKEN
                    const decoded = jwt.decode(data.token) as AuthResponseJwtDecoded | null;
                    return {
                        id         : String(decoded?.id),
                        name       : decoded?.name,
                        login      : decoded?.login,
                        profile    : decoded?.role,
                        accessToken: data.token,
                        dtExpired  : String(decoded?.exp)
                    };
                } catch (error) {
                    throw new Error(error as string);
                }
            }
            */
        })
    ],

    // PÁGINAS
    pages: {
        signIn: "/auth"
    },

    // CONFIGURAÇÕES DE SESSÃO E JWT
    session: {
        strategy: "jwt", // JWT
        maxAge: 24 * 60 * 60 // 24 HORAS EM SEGUNDOS
    },
    jwt: {
        maxAge: 24 * 60 * 60 // 24 HORAS EM SEGUNDOS
    },

    // CALLBACKS
    callbacks: {
        async jwt({ token, user }) {
            // console.log(`jwt callback - token: ${JSON.stringify(token)}`);
            // console.log(`jwt callback - user: ${JSON.stringify(user)}`);
            if (user) {
                token.id          = user.id;
                token.name        = user.name || "";
                token.login       = user.login || "";
                token.profile     = user.profile;
                token.accessToken = user.accessToken;
                token.dtExpired   = user.dtExpired;
            }
            return token;
        },

        // CALLBACK DA SESSÃO
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.dtExpired   = token.dtExpired as string;

            session.user = {
                id     : token.id  as string,
                name   : token.name as string,
                login  : token.login as string,
                profile: token.profile as string
            };

            return session;
        }
    },

    // 🔑 CHAVE SECRET DO NEXTAUTH
    secret: process.env.NEXTAUTH_SECRET
};
/*---- =======================
NEXT-AUTH END --------------*/