import Header from "./header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

export default async function Nav() {
    const session = await getServerSession(authOptions);
    return <Header session={session} />;
}