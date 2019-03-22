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
const rm = require("typed-rest-client/RestClient");
const https = require("https");
class FourChanApi {
    constructor() {
        this.baseUrl = 'https://a.4cdn.org/';
        this.imageUrl = 'https://i.4cdn.org/';
        this.rest = new rm.RestClient('YoMomma', this.baseUrl);
        this.images = new rm.RestClient('YoMomma', this.imageUrl);
    }
    getBoards() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.rest.get('boards.json');
            return this.returnIfSuccess(response);
        });
    }
    getCatalog(board) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.rest.get(`${board}/catalog.json`);
            return this.returnIfSuccess(response);
        });
    }
    getThread(board, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.rest.get(`${board}/thread/${id}.json`);
            return this.returnIfSuccess(response);
        });
    }
    downloadFile(board, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                https.get(`${this.imageUrl}/${board}/${filename}`, response => {
                    if (response.statusCode == 200) {
                        resolve(response);
                    }
                    else {
                        reject(response);
                    }
                });
            });
        });
    }
    returnIfSuccess(response) {
        if (response.statusCode == 200) {
            return response.result;
        }
        else {
            console.log("Error Fetching Data");
            return null;
        }
    }
}
exports.FourChanApi = FourChanApi;
