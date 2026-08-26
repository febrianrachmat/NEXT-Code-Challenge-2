import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('secret', 10);

  await prisma.thread.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        id: 'U001',
        username: 'johndoe',
        email: 'johndoe@example.com',
        passwordHash,
        createdAt: new Date('2026-04-20T10:00:00Z'),
      },
      {
        id: 'U002',
        username: 'janedoe',
        email: 'jane@example.com',
        passwordHash,
        createdAt: new Date('2026-04-21T14:30:00Z'),
      },
    ],
  });

  await prisma.thread.createMany({
    data: [
      {
        id: 'T101',
        userId: 'U001',
        title: 'How do I set up environment variables in Node.js?',
        content:
          'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?',
        createdAt: new Date('2026-04-22T08:15:00Z'),
        updatedAt: new Date('2026-04-22T08:15:00Z'),
      },
      {
        id: 'T102',
        userId: 'U002',
        title: 'When should I use PostgreSQL vs MongoDB?',
        content:
          'For a medium-scale e-commerce project, which database is more recommended and why?',
        createdAt: new Date('2026-04-22T09:45:00Z'),
        updatedAt: new Date('2026-04-22T10:00:00Z'),
      },
      {
        id: 'T103',
        userId: 'U001',
        title: 'Getting a CORS error when hitting the API from React',
        content:
          "I keep getting an 'Access-Control-Allow-Origin' error. How do I handle this on the Express.js side?",
        createdAt: new Date('2026-04-22T11:20:00Z'),
        updatedAt: new Date('2026-04-22T11:20:00Z'),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
