"use client"

import banner from "@/images/banner-home.png";
import Image from "next/image";
import { BookOpen, Flame, Clock3, GraduationCap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// CARDS
const cards = [
    {
        id: 1,
        type: "lessons",
        icon: BookOpen,
        value: 12,
        suffix: "aulas",
        description: "Concluídas até agora",
        progress: 60,
    },
    {
        id: 2,
        type: "streak",
        icon: Flame,
        value: 7,
        suffix: "dias",
        description: "Sequência ativa",
        progress: 70,
    },
    {
        id: 3,
        type: "time",
        icon: Clock3,
        value: "4h 20m",
        description: "Tempo estudado",
        progress: 48,
    },
];

// MÓDULOS
const modules = [
    {
        id: 1,
        title: "Fundamentos de IA",
        description: "Conceitos essenciais e primeiros passos",
        progress: 60,
        status: "Em andamento",
    },
    {
        id: 2,
        title: "IA para Produtividade",
        description: "Crie fluxos inteligentes para ganhar tempo",
        progress: 40,
        status: "Em andamento",
    },
    {
        id: 3,
        title: "Agentes com IA",
        description: "Construa assistentes capazes de executar tarefas",
        progress: 20,
        status: "Em andamento",
    }
];

export function Home() {
    return (
        <>
            {/* BANNER */}
            <header className="relative">
                <div className="w-full aspect-800/340 max-h-[340px] rounded-3xl overflow-hidden">
                    <Image
                        src={banner}
                        alt="banner-ia"
                        priority
                        className="w-full h-auto object-contain object-center"
                    />
                </div>
                <div className="absolute left-14 bottom-8">
                    <Button
                        asChild
                        size="lg"
                        className="bg-white hover:bg-white/90 text-indigo-600 font-semibold px-6 py-6"
                    >
                        <Link href="/academy">
                            Assistir aulas
                            <Play className="h-4 w-4 fill-indigo-600" />
                        </Link>
                    </Button>
                </div>
            </header>

            {/* CARDS */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.description}
                            className="bg-white dark:bg-[#0A0A0B] rounded-3xl space-y-2 p-6"
                        >
                            <Icon className="h-6 w-6 text-indigo-600" />

                            {/* TEXTO */}
                            <div>
                                <strong className="block text-2xl text-slate-950 dark:text-white">
                                    {card.value} {card.suffix}
                                </strong>
                                <p className="text-sm text-slate-500">
                                    {card.description}
                                </p>
                            </div>

                            {/* PROGRESSO */}
                            <div className="flex items-center gap-4">
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-indigo-600 transition-all"
                                        style={{ width: `${card.progress}%` }}
                                    />
                                </div>
                                <span className="text-sm font-semibold text-slate-500">
                                    {card.progress}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CONTEÚDO */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_390px]">
                <div className="rounded-[28px] bg-white dark:bg-[#0A0A0B] p-6">
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                        Minha jornada
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Continue pelos módulos recomendados para você.
                    </p>
                    <div className="mt-7 space-y-4">
                        {modules.map((module) => (
                            <div
                                key={module.id}
                                className="
                                    flex items-center rounded-3xl p-4 gap-5
                                    border border-slate-200 dark:border-white/10
                                "
                            >
                                {/* TEXTO */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="font-bold text-slate-950 dark:text-white">
                                            {module.title}
                                        </h3>
                                        <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200">
                                            {module.status}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {module.description}
                                    </p>
                                </div>

                                {/* PROGRESSO */}
                                <div className="hidden min-w-37.5 items-center gap-3 md:flex">
                                    <span className="text-sm font-semibold text-slate-500">
                                        {module.progress}%
                                    </span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-indigo-600"
                                            style={{ width: `${module.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROGRESSO */}
                <aside className="bg-indigo-800 text-white rounded-[28px] p-6">
                    <div className="flex items-center gap-4">
                        <GraduationCap className="h-7 w-7 text-indigo-100" />
                        <h2 className="text-2xl font-bold">
                            Seu progresso geral
                        </h2>
                    </div>
                    <div className="mt-8 flex items-center gap-7">
                        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-10 border-white/25">
                            <span className="text-3xl font-bold">35%</span>
                        </div>
                        <p className="text-sm leading-6 text-indigo-100">
                            Você já concluiu parte importante da trilha. Continue assim!
                        </p>
                    </div>
                </aside>
            </div>
        </>
    );
};