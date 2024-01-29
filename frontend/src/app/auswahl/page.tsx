"use client";

import { api } from "~/trpc/react";
import { type Book } from "@prisma/client";
import { Button } from "~/app/_components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

export default function Home() {
  const allBooksQuery = api.book.getAll.useQuery();
  const getTasksOfBorrowProcessQuery =
    api.camunda.getTasksOfBorrowProcess.useQuery();
  const borrowBookMutation = api.camunda.startBorrowProcess.useMutation({
    onSuccess: refresh,
  });
  const getTaskByBookMutation = api.camunda.getTaskByBook.useMutation({
    onSuccess: refresh,
  });
  const completeTaskMutation = api.camunda.completeTask.useMutation({
    onSuccess: refresh,
  });

  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session || undefined);
    };

    fetchSession();
  }, []);

  function refresh() {
    void allBooksQuery.refetch();
    void getTasksOfBorrowProcessQuery.refetch();
  }

  function handleBorrowBook(id: number) {
    borrowBookMutation.mutateAsync({ bookId: id }).then((r) => console.log(r));
  }

  function handleReturnBook(id: number) {
    getTaskByBookMutation
      .mutateAsync({
        bookId: id,
      })
      .then((r) => {
        console.log("Return Book", r);
        if (r.length === 0) {
          return;
        }
        const task = r[0];
        if (task) {
          completeTaskMutation
            .mutateAsync({
              id: task.id,
            })
            .then((r) => console.log(r));
        }
      });
    // completeTaskMutation.mutateAsync({
    //     id: task.id,
    // }).then(r => console.log(r));
  }

  function isBookBorrowed(id: number) {
    return getTasksOfBorrowProcessQuery.data?.some(
      (task: any) => task.variables?.bookId?.value === id,
    );
  }

  function isBorrowedBookFromCurrentUser(id: number) {
    return getTasksOfBorrowProcessQuery.data?.some((task: any) => {
      return (
        task.variables?.bookId?.value === id &&
        task.variables?.userId?.value === session?.user?.id
      );
    });
  }
  return (
    <>
      {allBooksQuery.data?.map((book: Book) => (
        // <div key={book.id} className={'border border-gray-300 p-4 my-4'}>
        //     <h2>{book.title}</h2>
        //     <p>{book.content}</p>
        // </div>
        <Card key={book.id} className={"my-4 p-4"}>
          <CardHeader>
            <CardTitle>
              {book.title} <span className={"text-sm"}>by {book.author}</span>
            </CardTitle>
            <CardDescription>{book.content}</CardDescription>
          </CardHeader>
          {session && (
            <CardFooter>
              {!isBookBorrowed(book.id) && (
                <Button
                  variant={"outline"}
                  onClick={() => handleBorrowBook(book.id)}
                  className={"mr-2"}
                >
                  Borrow
                </Button>
              )}
              {isBookBorrowed(book.id) &&
                isBorrowedBookFromCurrentUser(book.id) && (
                  <Button
                    variant={"outline"}
                    onClick={() => handleReturnBook(book.id)}
                  >
                    Return
                  </Button>
                )}
            </CardFooter>
          )}
        </Card>
      ))}
    </>
  );
}
