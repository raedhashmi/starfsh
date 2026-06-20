import "dotenv/config";
import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("Mommy.04", 10)
  const user = await prisma.user.upsert({
    where: { email: "raedhashmi15@gmail.com" },
    update: {},
    create: {
      name: "raedh",
      email: "raedhashmi15@gmail.com",
      password: hashedPassword,
      acceptsMarketing: true,
      createdAt: new Date(),
      apiKeys: {
        create: {
          key: "fsh_OzKfRKANLzaKanIsba0FruPxCuqs+HZHqUoCGotntwM=",
          name: "Default Key",
          isActive: true,
          createdAt: new Date(),
        },
      },
      repositories: {
        create: {
          repositoryName: "starfsh",
          repositoryLink: "https://github.com/raedhashmi/starfsh",
          summaryText: "starfsh is a tool for generating codebase summaries.",
        },
      },
    },
  });
  console.log(user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());