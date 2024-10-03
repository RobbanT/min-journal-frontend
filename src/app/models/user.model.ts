import { Post } from './post.model';

export interface User {
    username: string;
    password: string;
    posts: Post[];
}
