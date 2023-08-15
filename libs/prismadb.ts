import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// create a client
const client = globalThis.prisma || new PrismaClient();

// environment check for not creating multiple client
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// -> [ fix/hack ] for nextjs hot reloading
// nextjs hot reload create multiple prisma client
// warn(prisma-client) Already ** Prisma Clients are actively Running

export default client;
