"use client"

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <section className="w-full min-h-screen bg-indigo-800 flex items-center justify-center p-4">
            <article className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="text-left">
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                        Ops, esta página <br />
                        não foi encontrada
                    </h1>
                    <p className="text-lg text-gray-300 max-w-md mb-8">
                        A página que você procura pode ter sido removida, <br />
                        teve seu nome alterado ou está temporariamente indisponível.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="p-5"
                            onClick={() => window.history.back()}
                        >
                            Voltar
                        </Button>
                    </div>
                </div>

                {/* 404 */}
                <div className="flex items-center justify-center relative">
                    <h2 className="text-[120px] md:text-[150px] font-extrabold text-indigo-400 opacity-50">
                        4
                    </h2>

                    {/* PLANETA */}
                    <div className="mx-4 relative animate-spin-slow">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-indigo-300 shadow-lg shadow-indigo-700/40" />
                        <div className="absolute -top-3 -left-3 w-4 h-4 bg-indigo-300 rounded-full animate-pulse" />
                        <div className="absolute -top-6 right-3 w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-150" />
                        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-300" />
                    </div>

                    <h2 className="text-[120px] md:text-[150px] font-extrabold text-indigo-400 opacity-50">
                        4
                    </h2>
                </div>
            </article>
        </section>
    );
};