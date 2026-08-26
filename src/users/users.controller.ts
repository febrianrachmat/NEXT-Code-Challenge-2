import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { toPublicUser } from '../common/utils/serializers';
import { ApiErrorResponses } from '../common/swagger/api-error-responses';
import { userExample } from '../common/swagger/examples';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'View a public user profile',
    description: 'Returns public profile data. The password hash is never exposed.',
  })
  @ApiParam({ name: 'id', example: 'U001', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User profile found',
    schema: { example: userExample },
  })
  @ApiErrorResponses(404, 500)
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return toPublicUser(user);
  }
}
