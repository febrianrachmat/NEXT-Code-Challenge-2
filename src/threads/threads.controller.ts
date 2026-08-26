import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/auth.types';
import { ApiErrorResponses } from '../common/swagger/api-error-responses';
import { threadExample } from '../common/swagger/examples';

@ApiTags('Threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Create a new thread',
    description: 'Creates a discussion thread owned by the authenticated user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Thread created',
    schema: { example: threadExample },
  })
  @ApiErrorResponses(400, 401, 500)
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateThreadDto,
  ) {
    return this.threadsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all threads',
    description: 'Returns every thread from all users. Authentication is not required.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of threads',
    schema: { example: [threadExample] },
  })
  @ApiErrorResponses(500)
  findAll() {
    return this.threadsService.findAll();
  }

  @Get('my-threads')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'List threads of the logged-in user',
    description: 'Returns only threads created by the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of the current user threads',
    schema: { example: [threadExample] },
  })
  @ApiErrorResponses(401, 500)
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.threadsService.findMine(user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get thread details',
    description: 'Returns a single thread by ID. Authentication is not required.',
  })
  @ApiParam({ name: 'id', example: 'T101', description: 'Thread ID' })
  @ApiResponse({
    status: 200,
    description: 'Thread found',
    schema: { example: threadExample },
  })
  @ApiErrorResponses(404, 500)
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Update a thread',
    description: 'Updates title and/or content. Only the thread creator can do this.',
  })
  @ApiParam({ name: 'id', example: 'T101', description: 'Thread ID' })
  @ApiResponse({
    status: 200,
    description: 'Thread updated',
    schema: {
      example: {
        ...threadExample,
        title: 'Updated: environment variables in Node.js',
        updated_at: '2026-04-22T10:00:00.000Z',
      },
    },
  })
  @ApiErrorResponses(400, 401, 403, 404, 500)
  update(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateThreadDto,
  ) {
    return this.threadsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete a thread',
    description: 'Deletes a thread. Only the thread creator can do this.',
  })
  @ApiParam({ name: 'id', example: 'T101', description: 'Thread ID' })
  @ApiResponse({
    status: 200,
    description: 'Thread deleted',
    schema: { example: { message: 'Thread T101 deleted successfully' } },
  })
  @ApiErrorResponses(401, 403, 404, 500)
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.threadsService.remove(id, user.id);
  }
}
