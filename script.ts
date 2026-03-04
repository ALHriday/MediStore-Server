import { prisma } from "./lib/prisma";
import { app } from "./server";


async function main() {
    try {
        await prisma.$connect();
        console.log("DB Connected");

        app.listen(3000, () => {
            console.log(`Server is running at port: 3000`);
        });

    } catch {
        console.log("DB Disconnected!");
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
