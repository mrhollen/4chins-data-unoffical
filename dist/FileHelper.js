"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fsAsync = fs.promises;
class FileHelper {
    constructor() {
        this.filePath = "/home/hollen/Pictures/4chan";
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(this.filePath);
        }
    }
    saveFile(filename, board, data) {
        return new Promise((resolve, reject) => {
            fs.exists(`${this.filePath}/${board}`, exists => {
                if (!exists) {
                    fs.mkdir(`${this.filePath}/${board}`, error => {
                        if (error) {
                            reject(error);
                        }
                    });
                }
            });
            fs.writeFile(`${this.filePath}/${board}/${filename}`, data, error => {
                if (error) {
                    console.log(`Error saving file to ${this.filePath}/${board}/${filename}`);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.FileHelper = FileHelper;
