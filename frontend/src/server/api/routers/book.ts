import {z} from "zod";

import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({title: z.string().min(1), content: z.string().min(1), author: z.string().min(1)}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.book.create({
                data: {
                    title: input.title,
                    content: input.content,
                    author: input.author,
                },
            });
        }),

    getAll: publicProcedure.query(({ctx}) => {
        return ctx.db.book.findMany();
    }),

    delete: publicProcedure
        .input(z.object({id: z.number().min(1)}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.book.delete({
                where: {id: input.id},
            });
        }),
});
