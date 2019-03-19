import { ICoolDown } from './ICoolDown';
export interface IBoard {
    board: string;
    title: string;
    ws_board: number;
    per_page: number;
    pages: number;
    max_filesize: number;
    max_webm_filesize: number;
    max_comment_chars: number;
    max_webm_duration: number;
    bump_limit: number;
    image_limit: number;
    meta_description: string;
    is_archived: boolean;
    cooldowns: ICoolDown;
}