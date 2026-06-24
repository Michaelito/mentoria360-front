import { UserForm } from "@/components/admin/UserForm";

export default async function PageUserUpdate({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params; // PARÂMETRO ID DA URL

    return (
        <>
            {/* FORMULÁRIO DE EDITAR */}
            <UserForm
                userId={id}
            />
        </>
    );
};