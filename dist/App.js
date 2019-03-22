"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FourChanApi_1 = require("./FourChanApi");
const FileHelper_1 = require("./FileHelper");
const fs = require("fs");
let api = new FourChanApi_1.FourChanApi();
let files = new FileHelper_1.FileHelper();
const main = () => __awaiter(this, void 0, void 0, function* () {
    let boardCollection = yield api.getBoards();
    let fit = boardCollection.boards.filter(board => {
        return board.board === 'fit';
    })[0];
    let catalogs = yield api.getCatalog(fit.board);
    catalogs.forEach(catalog => {
        catalog.threads.forEach((thread) => __awaiter(this, void 0, void 0, function* () {
            let currentThread = yield api.getThread(fit.board, thread.no);
            currentThread.posts.forEach((post) => __awaiter(this, void 0, void 0, function* () {
                if (post.filename && post.filename !== '') {
                    console.log(`${post.tim}${post.ext}`);
                    let fsStream = fs.createWriteStream(`/home/hollen/Pictures/4chan/${fit.board}/${post.tim}${post.ext}`);
                    let file = yield api.downloadFile(fit.board, `${post.tim}${post.ext}`);
                    file.pipe(fsStream);
                    //await files.saveFile(`${post.tim}${post.ext}`, fit.board, fsStream);
                }
            }));
        }));
    });
});
main();
