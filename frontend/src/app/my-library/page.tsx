"use client";

import {api} from "~/trpc/react";
import {type Book} from "@prisma/client";
import {Button} from "~/app/_components/ui/button";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "~/app/_components/ui/card";
import {getSession, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Session} from "next-auth";

export default function MyLibrary() {
    const allBooksQuery = api.book.getAll.useQuery();
    const getTasksOfBorrowProcessQuery = api.camunda.getTasksOfBorrowProcess.useQuery();
    const returnBookMutation = api.camunda.completeTask.useMutation({
        onSuccess: refresh
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
        void allBooksQuery.refetch()
        void getTasksOfBorrowProcessQuery.refetch()
    }

    function handleReturnBook(id: number) {
        const task = getTasksOfBorrowProcessQuery.data?.find((task: any) => {
            return task.variables.bookId.value === id
        });
        if (task) {
            returnBookMutation.mutateAsync({
                id: task.id,
            }).then(r => console.log(r));
        }
    }

    function isBookBorrowed(id: number) {
        return getTasksOfBorrowProcessQuery.data?.some((task: any) => task.variables.bookId.value === id
        );
    }

    function isBorrowedBookFromCurrentUser(id: number) {
        return getTasksOfBorrowProcessQuery.data?.some((task: any) => {
            console.log(task.variables.userId.value + "===" + session?.user?.id)
            return task.variables.bookId.value === id && task.variables.userId.value === session?.user?.id
            }
        );
    }

    function getBorrowedBooksByCurrentUser() {
        return allBooksQuery.data?.filter((book: Book) => isBorrowedBookFromCurrentUser(book.id))
    }

    return (
        <>
            <h1 className={'text-2xl font-bold'}>My Library</h1>
            {getBorrowedBooksByCurrentUser()?.map((book: Book) => (
                // <div key={book.id} className={'border border-gray-300 p-4 my-4'}>
                //     <h2>{book.title}</h2>
                //     <p>{book.content}</p>
                // </div>
                <Card key={book.id} className={'p-4 my-4'}>
                    <CardHeader>
                        <CardTitle>{book.title} <span className={'text-sm'}>by {book.author}</span></CardTitle>
                        <CardDescription>{book.content}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant={"outline"} onClick={() => handleReturnBook(book.id)}>Return</Button>
                    </CardFooter>
                </Card>
            ))}
            {getBorrowedBooksByCurrentUser()?.length === 0 && <p>You have no borrowed books.</p>}
        </>
    );
}
