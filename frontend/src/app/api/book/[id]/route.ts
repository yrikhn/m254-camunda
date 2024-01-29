import {NextRequest, NextResponse} from "next/server";
import {db} from "~/server/db";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const id = +context.params.id;

    const book = await db.book.findUnique({
        where: {id: id},
    });

    return NextResponse.json(book);
}