import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl; // ROTA ATUAL

    // ROTAS PÚBLICAS
    const isAuthRoute =
        pathname.startsWith("/auth");

    // ROTAS PRIVADAS
    const isPrivateRoute =
        pathname.startsWith("/admin")   ||
        pathname.startsWith("/academy");

    // PEGA O TOKEN
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // 1. USUÁRIO NÃO AUTENTICADO (REDIRECIONA PARA PÁGINA DE AUTENTICAÇÃO)
    if (!token && isPrivateRoute) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    // 2. USUÁRIO AUTENTICADO (REDIRECIONA PARA PÁGINA DE DASHBOARD)
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/academy/home", req.url));
    }

    // 3. ACESSO À PÁGINA RAIZ "/"
    if (pathname === "/") {
        return NextResponse.redirect(
            new URL(token ? "/academy/home" : "/auth", req.url)
        );
    }

    // PERMITIR O ACESSO PARA OUTROS CASOS VÁLIDOS
    return NextResponse.next();
};

// DEFINE AS ROTAS NAS QUAIS O MIDDLEWARE SERÁ APLICADO, EXCLUINDO APIS E ARQUIVOS ESTÁTICOS
export const config = {
    matcher: ["/((?!api|_next|favicon.ico|images).*)"],
};