import { prisma } from "./lib/prisma";
import { app, port } from "./server";


async function main() {
    try {
        await prisma.$connect();
        console.log("DB Connected");

        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });

    } catch {
        console.log("DB Disconnected!");
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();

