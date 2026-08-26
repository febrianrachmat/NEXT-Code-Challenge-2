export type PublicUser = {
  id: string;
  username: string;
  email: string;
  created_at: Date;
};

export type ThreadAuthor = {
  id: string;
  username: string;
};

export type PublicThread = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  author?: ThreadAuthor;
};

export function toPublicUser(user: {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}): PublicUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.createdAt,
  };
}

export function toPublicThread(thread: {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: { id: string; username: string };
}): PublicThread {
  return {
    id: thread.id,
    user_id: thread.userId,
    title: thread.title,
    content: thread.content,
    created_at: thread.createdAt,
    updated_at: thread.updatedAt,
    author: thread.user
      ? { id: thread.user.id, username: thread.user.username }
      : undefined,
  };
}
