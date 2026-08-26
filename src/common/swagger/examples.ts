export const errorBodyExample = (
  statusCode: number,
  error: string,
  message: string | string[],
  path: string,
) => ({
  statusCode,
  error,
  message,
  path,
  timestamp: '2026-04-22T08:15:00.000Z',
});

export const userExample = {
  id: 'U001',
  username: 'johndoe',
  email: 'johndoe@example.com',
  created_at: '2026-04-20T10:00:00.000Z',
};

export const loginExample = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  token_type: 'Bearer',
  user: userExample,
};

export const threadExample = {
  id: 'T101',
  user_id: 'U001',
  title: 'How do I set up environment variables in Node.js?',
  content:
    'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?',
  created_at: '2026-04-22T08:15:00.000Z',
  updated_at: '2026-04-22T08:15:00.000Z',
  author: {
    id: 'U001',
    username: 'johndoe',
  },
};
