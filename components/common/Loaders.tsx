import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

/*---- =======================
LOADER START ---------------*/
export const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-4 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-gray-500 text-sm animate-pulse">Sincronizando dados...</p>
        </div>
    );
};
/*---- =======================
LOADER END -----------------*/

/*---- =======================
ERROR START ----------------*/
type ErrorProps = {
    message?: string;
};

export const ErrorMessage = ({ message }: ErrorProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-gray-500 text-sm">
                {message || "Não foi possível carregar os dados."}
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
                Tentar novamente
            </Button>
        </div>
    );
};
/*---- =======================
ERROR END ------------------*/

/*---- =======================
EMPTY START ----------------*/
type EmptyStateProps = {
    icon?: ReactNode;
    title?: string;
    description?: string;
    button?: ReactNode;
};

export function EmptyState({ icon, title, description, button }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            {icon && (
                <div className="
                    w-12 h-12 flex items-center justify-center
                    bg-gray-100 dark:bg-zinc-900 text-gray-500
                    rounded-full mb-2
                ">
                    {icon}
                </div>
            )}

            {/* TÍTULO */}
            <h2 className="text-md font-bold text-gray-900 dark:text-white">
                {title}
            </h2>

            {/* DESCRIÇÃO */}
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {description}
            </p>

            {/* BOTÃO */}
            {button && (
                <div className="mt-4">
                    {button}
                </div>
            )}
        </div>
    );
};
/*---- =======================
EMPTY END ------------------*/