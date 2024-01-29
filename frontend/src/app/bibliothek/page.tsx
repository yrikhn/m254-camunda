"use client";

import {api} from "~/trpc/react";
import {type Book} from "@prisma/client";
import {Button} from "~/app/_components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "~/app/_components/ui/card";
export default function Home() {
    const allBooksQuery = api.book.getAll.useQuery();
    const createBookMutation = api.book.create.useMutation({
        onSuccess: () => void allBooksQuery.refetch()
    });
    const deleteBookMutation = api.book.delete.useMutation({
        onSuccess: () =>  void allBooksQuery.refetch()
    });

    const handleCreateBook = () => {
        const title = 'The Hobbit';
        const content = 'In a hole in the ground there lived a hobbit.';
        const author = 'J.R.R. Tolkien';
        createBookMutation.mutate({title, content, author});
    }

    const handleDeleteBook = (id: number) => {
        deleteBookMutation.mutate({id});
    }

    return (
        <>
            <Button onClick={handleCreateBook} className={'p-4 my-4'}>
                Add new book
            </Button>
            {allBooksQuery.data?.map((book: Book) => (
                // <div key={book.id} className={'border border-gray-300 p-4 my-4'}>
                //     <h2>{book.title}</h2>
                //     <p>{book.content}</p>
                // </div>
                <Card key={book.id} className={'p-4 my-4'} onDoubleClick={() => handleDeleteBook(book.id)}>
                    <CardHeader>
                        <CardTitle>{book.title}</CardTitle>
                        <CardDescription>{book.content}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </>
    );
}
