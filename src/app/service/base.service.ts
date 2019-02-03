import { HttpQuery } from "./queries/study";
import { AxiosInstance } from "axios";

export default class BaseService {
    constructor (protected http: AxiosInstance) {
    }

    protected post (query: HttpQuery) {
        return this.http.post(query.Url, query.body);
    }

    protected get (query: HttpQuery) {
        return this.http.get(query.Url, query.body);
    }

    protected listToClass(response: any, classs: any) {
        return response.data.map(el => new classs(el))
    }
}