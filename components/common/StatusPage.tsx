"use client"

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

// PROPS
interface ErrorProps {
    reset?: () => void;
};

// CONFIGURAÇÕES DO STATUS
interface UIStatusConfig {
    background: string;
    img: string;
    badge: string;
    label: string;
    action: () => void;
};

// FLAG DE REDIRECIONAMENTO
const REDIRECT_FLAG = "api_error_redirecting";

export function StatusPage({ reset }: ErrorProps) {
    const router = useRouter(); // HOOK PARA REDIRECIONAMENTO
    const params = useSearchParams(); // PARÂMETROS DA URL

    // PARÂMETROS DO ERRO
    const status           = Number(params.get("status") ?? 500);
    const titleParam       = params.get("title");
    const descriptionParam = params.get("description");
    const messageParam     = params.get("message");
    const logout           = params.get("logout") === "true";

    // TÍTULO E DESCRIÇÃO
    const title = titleParam ?? "Algo deu errado";
    const description = descriptionParam ?? messageParam ?? "Não conseguimos processar sua solicitação no momento.";

    // REMOVE O FLAG DE REDIRECIONAMENTO
    useEffect(() => {
        sessionStorage.removeItem(REDIRECT_FLAG);
    }, []);

    // REDIRECIONA PARA A PÁGINA DE LOGIN
    useEffect(() => {
        if (logout) {
            signOut({
                callbackUrl: "/auth"
            });
        }
    }, [logout]);

    // CONFIGURAÇÕES DE ACORDO COM O STATUS
    const uiConfig = useMemo((): UIStatusConfig => {
        const configs: Record<number, UIStatusConfig> = {
            401: {
                background: "bg-[#0A0A0B]",
                img       : "/illustrations/auth-error.svg",
                badge     : "Acesso Expirado",
                label     : "Voltar para o login",
                action    : () => router.push("/auth")
            },
            403: {
                background: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500",
                img       : "/illustrations/forbidden.svg",
                badge     : "Acesso Negado",
                label     : "Tentar Novamente",
                action    : () => window.history.back()
            }
        };

        return (
            configs[status] ?? {
                background: "bg-[#0A0A0B]",
                img       : "/illustrations/server-error.svg",
                badge     : `Erro ${status}`,
                label     : "Tentar Novamente",
                action: () => {
                    if (reset) {
                        reset();
                        return;
                    }
                    router.back();
                }
            }
        );
    }, [status, router, reset]);

    return (
        <section className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${uiConfig.background} p-4 md:p-8`}>
            <article className="relative w-full max-w-5xl z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-16 gap-12">
                    <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <span className="rounded-full bg-white/20 text-white text-sm font-bold tracking-widest uppercase backdrop-blur-sm mb-6 px-4 py-1.5">
                            {uiConfig.badge}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-md">
                            {description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                onClick={uiConfig.action}
                                size="lg"
                                className="bg-white text-black hover:bg-white/90 font-bold px-8 h-14 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                {uiConfig.label}
                            </Button>
                        </div>
                    </div>

                    {/* IMAGEM */}
                    <div className="order-1 lg:order-2 flex justify-center items-center relative">
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
                        <Image
                            src={uiConfig.img}
                            alt="Status Error Illustration"
                            width={450}
                            height={450}
                            priority
                            className="relative z-10 drop-shadow-2xl animate-float transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>
            </article>

            {/* CSS PARA A ANIMAÇÃO DE FLUTUAÇÃO NO SEU GLOBALS.CSS */}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};