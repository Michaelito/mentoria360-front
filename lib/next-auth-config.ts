import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { AuthResponse, AuthResponseJwtDecoded } from "@/types/type-login";

/*---- =======================
NEXT-AUTH START ------------*/
export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text"
                },
                password: {
                    label: "Senha",
                    type: "password"
                }
            },

            // AUTHORIZER
            async authorize(credentials) {
                // console.log("authorize chamado");
                // console.log("credentials recebidas:", credentials);

                // VALIDA AS CREDENCIAIS
                if (!credentials?.email || !credentials?.password) {
                    // console.log("nenhuma credencial recebida");
                    return null;
                }

                // FAZ A REQUISIÇÃO
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
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
                    if (!data?.user?.access_token) return null;

                    // DECODIFIQUE O TOKEN
                    const decoded = jwt.decode(data.user.access_token) as AuthResponseJwtDecoded | null;
                    // console.log("login autorizado! accessToken:", decoded);

                    return {
                        id         : String(decoded?.id),
                        name       : decoded?.name,
                        email      : decoded?.email,
                        profile    : decoded?.profile,
                        accessToken: data.user.access_token,
                        dtExpired  : data.user.dt_expired
                    };
                } catch (error) {
                    throw new Error(error as string);
                }
            }
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
                token.email       = user.email || "";
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
                email  : token.email as string,
                profile: token.profile as number
            };

            return session;
        }
    },

    // 🔑 CHAVE SECRET DO NEXTAUTH
    secret: process.env.NEXTAUTH_SECRET
};
/*---- =======================
NEXT-AUTH END --------------*/