import { HttpQuery } from "./queries/study";
import { AxiosInstance } from "axios";

export default class BaseService {
    constructor (protected http: AxiosInstance) {
    }

    protected post (query: HttpQuery, classs: any) {
        return this.http.post(query.Url, query.body).
            then(res => this.listToClass(res, classs));
    }

    protected get (query: HttpQuery) {
        return this.http.get(query.Url, query.body).then(res => res.data);
    }

    protected listToClass(response: any, classs: any) {
        return response.data.map(el => new classs(el))
    }
}