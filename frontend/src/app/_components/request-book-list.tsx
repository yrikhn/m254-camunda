"use client";

import { api } from "~/trpc/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { Button } from "~/app/_components/ui/button";

export default function RequestBookList() {
  const allBookRequests = api.camunda.getAllBookRequestTasks.useQuery();
  const completeWithVariablesMutation =
    api.camunda.completeTaskWithVariables.useMutation({
      onSuccess: () => {
        allBookRequests.refetch();
      },
    });
  const createBookMutation = api.book.create.useMutation();

  function handleDecision(taskId: string, decision: boolean, book: any) {
    completeWithVariablesMutation
      .mutateAsync({
        id: taskId,
        variables: {
          requestAccepted: {
            value: decision,
            type: "Boolean",
          },
        },
      })
      .then((r) => {
        console.log(r);
        if (decision) {
          createBookMutation
            .mutateAsync({
              title: book.title,
              content: book.content,
              author: book.author,
            })
            .then((r) => {
              console.log(r);
            });
        }
      });
  }

  return (
    <div className={"mt-8"}>
      {!allBookRequests.data?.length && <p>No Book Requests</p>}
      <ul>
        {allBookRequests.data
          ?.map((task: any) => {
            return {
              book: JSON.parse(task.variables.book.value),
              task: task,
            };
          })
          .map((data: any) => {
            return (
              <li key={data.task.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {data.book.title}{" "}
                      <span className={"text-sm"}>by {data.book.author}</span>
                    </CardTitle>
                    <CardDescription>{data.book.content}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      className={"mr-4"}
                      variant={"outline"}
                      onClick={() =>
                        handleDecision(data.task.id, true, data.book)
                      }
                    >
                      Ja
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        handleDecision(data.task.id, false, data.book)
                      }
                    >
                      Nei
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
