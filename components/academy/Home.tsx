"use client"

import banner from "@/images/banner-home.png";
import Image from "next/image";
import { CalendarDays, TrendingUp } from "lucide-react";
import { HomeModule } from "@/components/academy/HomeModule";

export function Home() {
    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] mb-8 gap-6">
                <div className="w-full aspect-video rounded-3xl overflow-hidden">
                    <Image
                        src={banner}
                        alt="banner-ia"
                        className="w-full h-full object-cover object-left"
                    />
                </div>

                {/* PROGRESSO */}
                <aside className="bg-white dark:bg-[#0A0A0B] rounded-2xl p-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-indigo-100">
                            <span className="text-lg font-bold text-indigo-600">
                                35%
                            </span>
                        </div>
                        <h2 className="mt-5 text-base font-semibold text-slate-900">
                            Continue aprendendo!
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Você está evoluindo na sua jornada com IA.
                        </p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                            <TrendingUp className="mx-auto h-5 w-5 text-indigo-600" />
                            <strong className="mt-2 block text-lg text-slate-950">
                                35%
                            </strong>
                            <span className="text-xs text-slate-500">
                                Progresso
                            </span>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                            <CalendarDays className="mx-auto h-5 w-5 text-indigo-600" />
                            <strong className="mt-2 block text-sm text-slate-950">
                                Hoje
                            </strong>
                            <span className="text-xs text-slate-500">
                                Último acesso
                            </span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* MÓDULOS */}
            <HomeModule />
        </>
    );
};