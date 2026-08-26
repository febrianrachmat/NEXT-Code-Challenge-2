export type JwtPayload = {
  sub: string;
  username: string;
  email: string;
};

export type AuthenticatedUser = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
};
