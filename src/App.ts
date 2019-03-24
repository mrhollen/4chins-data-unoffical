import { FourChanApi } from './FourChanApi';
import { FileHelper } from './FileHelper';
import * as fs from 'fs';
let api = new FourChanApi();
let files = new FileHelper();

const main = async (): Promise<void> => {
    let boardCollection = await api.getBoards();

    let fit = boardCollection.boards.filter(board => {
        return board.board === 'fit';
    })[0];

    let catalogs = await api.getCatalog(fit.board);

    catalogs.forEach(catalog => {
        catalog.threads.forEach(async thread => {
            let currentThread = await api.getThread(fit.board, thread.no);

            currentThread.posts.forEach(async post => {
                if(post.filename && post.filename !== ''){
                    console.log(`${post.tim}${post.ext}`);

                    let fsStream = fs.createWriteStream(`/home/hollen/Pictures/4chan/${fit.board}/${post.tim}${post.ext}`);
                    let file = await api.downloadFile(fit.board, `${post.tim}${post.ext}`);
                    file.pipe(fsStream);
                    //await files.saveFile(`${post.tim}${post.ext}`, fit.board, fsStream);
                }
            });
        });
    });
}

main();