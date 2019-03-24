import * as rm from 'typed-rest-client/RestClient';
import { IBoardCollection } from './Models/IBoardCollection';
import { ICatalog } from './Models/ICatalog';
import { IThread } from './Models/IThread';
import * as https from 'https';

export class FourChanApi {
    private baseUrl: string = 'https://a.4cdn.org/';
    private imageUrl: string = 'https://i.4cdn.org/';
    private rest: rm.RestClient;
    private images: rm.RestClient;

    constructor(){ 
        this.rest = new rm.RestClient('YoMomma', this.baseUrl);
        this.images = new rm.RestClient('YoMomma', this.imageUrl);
    }

    async getBoards(): Promise<IBoardCollection> {
        let response: rm.IRestResponse<IBoardCollection> = await this.rest.get<IBoardCollection>('boards.json');

        return this.returnIfSuccess<IBoardCollection>(response);
    }

    async getCatalog(board: string): Promise<ICatalog[]> {
        let response: rm.IRestResponse<ICatalog[]> = await this.rest.get<ICatalog[]>(`${board}/catalog.json`);

        return this.returnIfSuccess<ICatalog[]>(response);
    }

    async getThread(board: string, id: number): Promise<IThread> {
        let response: rm.IRestResponse<IThread> = await this.rest.get<IThread>(`${board}/thread/${id}.json`);

        return this.returnIfSuccess<IThread>(response);
    }

    async downloadFile(board: string, filename: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            https.get(`${this.imageUrl}/${board}/${filename}`, response => {
                if(response.statusCode === 200){
                    resolve(response);
                }else {
                    reject(response);
                }
            });
        });
    }

    private returnIfSuccess<T>(response: rm.IRestResponse<T>): T {
        if(response.statusCode === 200){
            return response.result;
        }else {
            console.log("Error Fetching Data");
            return null;
        }
    }
}