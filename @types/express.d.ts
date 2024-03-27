declare namespace Express {
  interface Request {
    user?: import('$lib/common/entities/user.entity').UserEntity;
  }
}
