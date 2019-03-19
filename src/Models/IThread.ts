import { IPost } from './IPost';
export interface IThread{
    no: number;
    sticky: boolean;
    closed: boolean;
    now: string;
    name: string;
    com: string;
    filename: string;
    ext: string;
    w: number;
    h: number;
    tn_h: number;
    tn_w: number;
    tim: number;
    time: number;
    md5: string;
    fsize: number;
    restro: number;
    capcode: string;
    semantic_url: string;
    replies: number;
    images: number;
    omitted_posts: number;
    omitted_images: number;
    last_modified: number;
    last_replies: IPost[];
    posts: IPost[];
}