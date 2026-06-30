"use client"

export default function Loading() {
    return (
        <section className="w-screen h-screen bg-indigo-800 flex flex-col items-center justify-center p-4">
            <article className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-white opacity-50 animate-bounce" />
                    <div className="w-3 h-3 rounded-full bg-white opacity-50 animate-bounce delay-150" />
                    <div className="w-3 h-3 rounded-full bg-white opacity-50 animate-bounce delay-300" />
                </div>
                <p className="text-center text-lg text-gray-300 max-w-md mb-8">
                    Aguarde um instante enquanto preparamos tudo para você.
                </p>
            </article>
        </section>
    );
};