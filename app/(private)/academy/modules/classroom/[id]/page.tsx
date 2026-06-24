import { ModuleClassroom } from "@/components/academy/ModuleClassroom";

export default async function PageModuleClassroom({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params; // PARÂMETRO ID DA URL

    return (
        <>
            {/* FORMULÁRIO DE EDIÇÃO */}
            <ModuleClassroom
                moduleId={Number(id)}
            />
        </>
    );
};