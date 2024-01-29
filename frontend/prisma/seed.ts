const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'davide@marcoli.ch' },
        update: {},
        create: {
            id: "1",
            email: 'davide@marcoli.ch',
            name: 'user',
        },
    })
    const librarian = await prisma.user.upsert({
        where: { email: 'orangesushi494@gmail.com' },
        update: {},
        create: {
            id: "2",
            email: 'orangesushi494@gmail.com',
            name: 'librarian',
        },
    })
    console.log({ user, librarian })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })