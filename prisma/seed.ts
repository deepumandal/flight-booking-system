// import {
//   // Prisma,
//   // PrismaClient,
// } from "@prisma/client";
// // import { AdminCredentials } from "../src/old-app/app-config/database";

// const prisma = new PrismaClient();

// // const red = "\x1b[31m"; // ANSI escape code for red
// // const bold = "\x1b[1m"; // ANSI escape code for bold
// // const reset = "\x1b[0m"; // Reset formatting

// // const handleError = (errorMessage: string) => {
// //   // eslint-disable-next-line prefer-template
// //   console.error(red, bold, `\n ${errorMessage} \n`, reset);
// //   // Exit the process after the error message
// //   process.exit(1);
// // };

// const seedAuthenticationModel = async () => {
//   // try {
//   //   return await prisma.authentication.upsert({
//   //     where: AdminCredentials as Prisma.AuthenticationWhereUniqueInput,
//   //     update: AdminCredentials,
//   //     create: AdminCredentials
//   //   });
//   // } catch (err) {
//   //   return handleError((err as Error).message);
//   // }
// };

// const main = async () => {
//   console.log("Db Seeding in process...");
//   // auth service initialization
//   await seedAuthenticationModel();
// };
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e: unknown) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
