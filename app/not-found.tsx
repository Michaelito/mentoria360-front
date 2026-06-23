"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <section className="relative bg-linear-to-br from-emerald-600 to-teal-700 min-h-screen w-full flex items-center justify-center overflow-hidden p-4 md:p-8">
            <article className="relative w-full max-w-5xl z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-16 gap-12">
    
                    {/* TEXTO E BOTÕES */}
                    <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Ops, esta página <br />
                            não foi encontrada
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-md">
                            A página que você procura pode ter sido removida, <br />
                            teve seu nome alterado ou está temporariamente indisponível.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-white/90 font-bold transition-all hover:scale-105 active:scale-95 rounded-2xl px-8 h-14"
                                onClick={() => window.history.back()}
                            >
                                Voltar
                            </Button>
                        </div>
                    </div>

                    {/* IMAGEM */}
                    <div className="order-1 lg:order-2 flex justify-center items-center relative">
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
                        <Image
                            src="/illustrations/not-found.svg"
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
            <style jsx global>
                {`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                `}
            </style>
        </section>
    );
};