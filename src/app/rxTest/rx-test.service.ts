import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { repos } from './repos';

@Injectable()

export class RxTestService {
    baseURL: string = "https://api.github.com/";

    constructor(private http: Http) {

    }

    getRepos(userName: string): Observable<repos[]> {
        console.log("getting data from " + this.baseURL + "users/" + userName + '/repos');
        return this.http.get(this.baseURL + 'users/' + userName + '/repos')
            .map(this.extractRepos)
            .catch(this.handleError);
    }

    private extractRepos(res: Response) {
        return <repos[]>res.json();
    }

    private handleError(res: Response) {
        console.error(res);
        return Observable.throw(res.json().error || 'Server Error');
    }
}