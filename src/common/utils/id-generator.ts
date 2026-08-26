import { PrismaService } from '../../prisma/prisma.service';

async function nextNumericId(
  ids: string[],
  prefix: string,
  startFrom: number,
): Promise<string> {
  const max = ids.reduce((currentMax, id) => {
    const numericPart = Number.parseInt(id.replace(prefix, ''), 10);
    if (Number.isNaN(numericPart)) {
      return currentMax;
    }
    return Math.max(currentMax, numericPart);
  }, startFrom - 1);

  return `${prefix}${String(max + 1).padStart(3, '0')}`;
}

export async function generateUserId(prisma: PrismaService): Promise<string> {
  const users = await prisma.user.findMany({ select: { id: true } });
  return nextNumericId(
    users.map((user) => user.id),
    'U',
    1,
  );
}

export async function generateThreadId(prisma: PrismaService): Promise<string> {
  const threads = await prisma.thread.findMany({ select: { id: true } });
  return nextNumericId(
    threads.map((thread) => thread.id),
    'T',
    101,
  );
}
