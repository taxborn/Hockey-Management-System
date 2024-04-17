import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.roles.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      name: "Admin",
    },
    update: {},
  });

  const staff = await prisma.roles.upsert({
    where: { id: 2 },
    create: {
      id: 2,
      name: "Staff",
    },
    update: {},
  });

  const player = await prisma.roles.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "Player",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
