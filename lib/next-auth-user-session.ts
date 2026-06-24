import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth-config";

export async function getUserSessionData() {
    const session = await getServerSession(nextAuthOptions);

    if (!session || !session.user) {
        return null;
    }

    return {
        id     : session.user.id,
        name   : session.user.name,
        email  : session.user.email,
        profile: session.user.profile,
        company: session.user.company
    };
};