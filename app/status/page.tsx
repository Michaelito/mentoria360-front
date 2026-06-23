import { Suspense } from "react";
import { StatusPage } from "@/components/common/StatusPage";

export default async function PageError() {
    return (
        <Suspense fallback={null}>
            <StatusPage />
        </Suspense>
    );
};