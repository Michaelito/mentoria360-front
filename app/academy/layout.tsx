import { getUserSessionData } from "@/lib/next-auth-user-session";
import { Navbar } from "@/components/common/Navbar";
import { Menu } from "@/components/common/Menu";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserSessionData(); // DADOS DO USUÁRIO DA SESSÃO

    return (
        <main className="h-screen flex overflow-hidden bg-[#F4F5F7] dark:bg-[#0F1113]">
            <SidebarProvider defaultOpen={true}>
                <Menu />

                <section className="flex flex-1 flex-col relative overflow-hidden">
                    <Navbar
                        userName={user?.name}
                        userEmail={user?.login}
                    />

                    {/* CONTEÚDO */}
                    <article className="flex-1 overflow-y-auto p-4 md:p-8 transition-colors duration-300">
                        <div className="max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="space-y-4">
                                {children}
                            </div>    
                        </div>
                    </article>

                    {/* ELEMENTO DECORATIVO SUTIL NO FUNDO (DARK MODE) */}
                    <div
                        className="
                            absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/5
                            blur-[100px] rounded-full pointer-events-none dark:block hidden
                        "
                    />
                </section>
            </SidebarProvider>
        </main>
    );
};