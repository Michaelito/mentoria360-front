// import logo from "@/images/logo.png";
import Image from "next/image";

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="w-full h-dvh grid grid-cols-1 md:grid-cols-2 bg-white">
            <section className="hidden md:flex relative overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-violet-600">
                {/* EFEITO DE PONTOS */}
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />

                {/* CÍRCULOS DECORATIVOS */}
                <div className="absolute -top-40 -left-40 w-125 h-125 border border-white/10 rounded-full" />
                <div className="absolute -bottom-50 -right-25 w-150 h-150 border border-white/10 rounded-full" />

                {/* BLUR DECORATIVO */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-white/5 rounded-full blur-3xl" />

                {/* CONTEÚDO */}
                <article className="relative max-w-2xl h-full flex flex-col justify-center px-16 py-14 z-20">
                    <div className="mb-12">
                        <div className="inline-flex items-center rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-12 px-4 py-1 gap-2">
                            <div className="w-2 h-2 rounded-full bg-violet-300" />
                            <span className="text-xs text-white font-medium">
                                Plataforma de Cursos em IA
                            </span>
                        </div>

                        {/* TÍTULO */}
                        <h2 className="max-w-xl text-5xl text-white leading-[1.05] font-bold tracking-tight">
                            Aprenda Inteligência Artificial e domine as tecnologias do futuro.
                        </h2>

                        {/* LINHA DECORATIVA */}
                        <div className="w-52 h-1 rounded-full bg-white/30 mt-6 mb-10" />

                        {/* DESCRIÇÃO */}
                        <p className="text-lg leading-9 text-violet-50/90 max-w-lg">
                            Acesse cursos práticos, projetos reais e conteúdos atualizados para acelerar sua carreira em IA, automação e desenvolvimento de soluções inteligentes.
                        </p>
                    </div>

                    {/* COPYRIGHT */}
                    <p className="text-sm text-white/40">
                        © {new Date().getFullYear()} AI Academy • Plataforma de Ensino em Inteligência Artificial
                    </p>
                </article>
            </section>

            {/* AUTH */}
            <section className="flex items-center justify-center p-8 md:p-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="w-full max-w-md border-none shadow-none bg-transparent space-y-6 z-20">
                    <div className="flex justify-center mb-8">
                        {/*
                        <Image
                            src={logo}
                            width={120}
                            height={60}
                            quality={100}
                            alt="logo-ai-academy"
                            className="w-auto h-24 object-contain"
                            priority
                        />
                        */}
                    </div>

                    {/* CONTEÚDO */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    );
};