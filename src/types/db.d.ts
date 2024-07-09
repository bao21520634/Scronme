import type { Post, Zone, User, Vote, Comment } from '@prisma/client';

export type ExtendedPost = Post & {
    zone: Zone;
    votes: Vote[];
    author: User;
    comments: Comment[];
};
