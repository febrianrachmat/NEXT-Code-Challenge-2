import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { generateThreadId } from '../common/utils/id-generator';
import { toPublicThread } from '../common/utils/serializers';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

const authorSelect = {
  user: {
    select: {
      id: true,
      username: true,
    },
  },
} as const;

@Injectable()
export class ThreadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateThreadDto) {
    const id = await generateThreadId(this.prisma);
    const thread = await this.prisma.thread.create({
      data: {
        id,
        userId,
        title: dto.title,
        content: dto.content,
      },
      include: authorSelect,
    });

    return toPublicThread(thread);
  }

  async findAll() {
    const threads = await this.prisma.thread.findMany({
      include: authorSelect,
      orderBy: { createdAt: 'desc' },
    });

    return threads.map(toPublicThread);
  }

  async findMine(userId: string) {
    const threads = await this.prisma.thread.findMany({
      where: { userId },
      include: authorSelect,
      orderBy: { createdAt: 'desc' },
    });

    return threads.map(toPublicThread);
  }

  async findOne(id: string) {
    const thread = await this.prisma.thread.findUnique({
      where: { id },
      include: authorSelect,
    });

    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }

    return toPublicThread(thread);
  }

  async update(id: string, userId: string, dto: UpdateThreadDto) {
    if (!dto.title && !dto.content) {
      throw new BadRequestException(
        'At least one of title or content must be provided',
      );
    }

    const thread = await this.getOwnedThread(id, userId);
    const updated = await this.prisma.thread.update({
      where: { id: thread.id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.content !== undefined ? { content: dto.content } : {}),
      },
      include: authorSelect,
    });

    return toPublicThread(updated);
  }

  async remove(id: string, userId: string) {
    const thread = await this.getOwnedThread(id, userId);
    await this.prisma.thread.delete({ where: { id: thread.id } });

    return {
      message: `Thread ${thread.id} deleted successfully`,
    };
  }

  private async getOwnedThread(id: string, userId: string) {
    const thread = await this.prisma.thread.findUnique({ where: { id } });

    if (!thread) {
      throw new NotFoundException(`Thread with id ${id} not found`);
    }

    if (thread.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to modify this thread',
      );
    }

    return thread;
  }
}
