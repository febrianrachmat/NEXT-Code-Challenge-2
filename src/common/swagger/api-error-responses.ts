import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { errorBodyExample } from './examples';

const catalog: Record<
  number,
  { description: string; example: ReturnType<typeof errorBodyExample> }
> = {
  400: {
    description: 'Bad Request — empty input or invalid email format',
    example: errorBodyExample(
      400,
      'Bad Request',
      ['email must be a valid email address'],
      '/api/auth/register',
    ),
  },
  401: {
    description: 'Unauthorized — missing or invalid authentication token',
    example: errorBodyExample(
      401,
      'Unauthorized',
      'Authentication token is missing or invalid',
      '/api/threads',
    ),
  },
  403: {
    description: 'Forbidden — only the thread creator may update or delete it',
    example: errorBodyExample(
      403,
      'Forbidden',
      'You are not authorized to modify this thread',
      '/api/threads/T101',
    ),
  },
  404: {
    description: 'Not Found — the requested resource does not exist',
    example: errorBodyExample(
      404,
      'Not Found',
      'Thread with id T999 not found',
      '/api/threads/T999',
    ),
  },
  409: {
    description: 'Conflict — email or username is already taken',
    example: errorBodyExample(
      409,
      'Conflict',
      'Email is already registered',
      '/api/auth/register',
    ),
  },
  500: {
    description: 'Internal Server Error',
    example: errorBodyExample(
      500,
      'Internal Server Error',
      'Internal server error',
      '/api/threads',
    ),
  },
};

export function ApiErrorResponses(...statusCodes: number[]) {
  return applyDecorators(
    ...statusCodes.map((status) =>
      ApiResponse({
        status,
        description: catalog[status]?.description ?? 'Error',
        schema: {
          example: catalog[status]?.example,
        },
      }),
    ),
  );
}
