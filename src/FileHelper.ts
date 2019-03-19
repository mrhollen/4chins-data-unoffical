import * as fs from 'fs';

const fsAsync = fs.promises;

export class FileHelper {
    private filePath: string = "/home/hollen/Pictures/4chan";

    constructor(){
        if(!fs.existsSync(this.filePath)){
            fs.mkdirSync(this.filePath);
        }
    }

    saveFile(filename: string, board: string, data: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.exists(`${this.filePath}/${board}`, exists => {
                if(!exists){
                    fs.mkdir(`${this.filePath}/${board}`, error => {
                        if(error){
                            reject(error);
                        }
                    });
                }
            });

            fs.writeFile(`${this.filePath}/${board}/${filename}`, data, error => {
                if(error){
                    console.log(`Error saving file to ${this.filePath}/${board}/${filename}`);
                    reject(error);
                } else{
                    resolve();
                }
            });
        });
    }
}