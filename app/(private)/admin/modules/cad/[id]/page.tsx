import { ModuleForm } from "@/components/admin/ModuleForm";

export default async function PageModuleUpdate({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params; // PARÂMETRO ID DA URL

    return (
        <>
            {/* FORMULÁRIO DE EDITAR */}
            <ModuleForm
                moduleId={id}
            />
        </>
    );
};