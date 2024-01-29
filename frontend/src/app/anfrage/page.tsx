"use client";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { api } from "~/trpc/react";
import RequestBookForm from "~/app/_components/request-book-form";
import RequestBookList from "~/app/_components/request-book-list";

export default function RequestBooks() {
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session || undefined);
    };

    fetchSession();
  }, []);

  return (
    <div className={"flex flex-col items-center justify-center"}>
      <h1 className={"mt-4 text-4xl font-bold"}>Film anfragen</h1>

      {/*The user has the role {session?.user?.role}*/}
      {/*and should see the {session?.user?.role === "user" ? "form" : "list of all book requests"}*/}

      {session?.user.role == "librarian" && <RequestBookList />}
      {session?.user.role == "user" && <RequestBookForm />}
    </div>
  );
}
