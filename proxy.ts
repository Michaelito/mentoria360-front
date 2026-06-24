import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl; // ROTA ATUAL

    // ROTAS PÚBLICAS
    const isAuthRoute =
        pathname.startsWith("/auth");

    // ROTAS PRIVADAS
    const isPrivateRoute =
        pathname.startsWith("/admin") ||
        pathname.startsWith("/academy");

    // PEGA O TOKEN
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    // PERFIL DO USUÁRIO
    const profile = Number(token?.profile);

    // 1. USUÁRIO NÃO AUTENTICADO (REDIRECIONA PARA PÁGINA DE AUTENTICAÇÃO)
    if (!token && isPrivateRoute) {
        return NextResponse.redirect(
            new URL("/auth", req.url)
        );
    }

    // 2. USUÁRIO AUTENTICADO ACESSANDO AUTH
    if (token && isAuthRoute) {
        return NextResponse.redirect(
            new URL(
                profile === 2
                    ? "/academy/home"
                    : "/admin/dashboard",
                req.url
            )
        );
    }

    // 3. ACESSO À PÁGINA RAIZ "/"
    if (pathname === "/") {
        return NextResponse.redirect(
            new URL(
                token
                    ? profile === 2
                        ? "/academy/home"
                        : "/admin/dashboard"
                    : "/auth",
                req.url
            )
        );
    }

    // 4. CONTROLE DE ACESSO POR PERFIL

    // ADMIN (1) POSSUI ACESSO TOTAL
    if (profile === 1) {
        const canAccessAcademy =
            pathname.startsWith("/admin");

        if (!canAccessAcademy) {
            return NextResponse.redirect(
                new URL("/admin/dashboard", req.url)
            );
        }

        return NextResponse.next();
    }

    // USER (2) POSSUI ACESSO A TODAS AS ROTAS DA ACADEMY
    if (profile === 2) {
        const canAccessAcademy =
            pathname.startsWith("/academy");

        if (!canAccessAcademy) {
            return NextResponse.redirect(
                new URL("/academy/home", req.url)
            );
        }

        return NextResponse.next();
    }

    // PERFIL INVÁLIDO OU NÃO RECONHECIDO
    if (token) {
        return NextResponse.redirect(
            new URL("/auth", req.url)
        );
    }

    // PERMITIR O ACESSO PARA OUTROS CASOS VÁLIDOS
    return NextResponse.next();
};

// DEFINE AS ROTAS NAS QUAIS O MIDDLEWARE SERÁ APLICADO, EXCLUINDO APIS E ARQUIVOS ESTÁTICOS
export const config = {
    matcher: ["/((?!api|_next|favicon.ico|images).*)"],
};