import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RxTestService } from './rx-test.service';

import { repos } from './repos';

@Component({
    selector: 'rx-test',
    templateUrl: 'rxtest.component.html'
})

export class RxTestComponent {
    userName: string = "paradzuli";
    repos: repos[];

    loading: boolean = false;
    errorMessage: string;

    constructor(private rxTestService: RxTestService) { }

    public getRepos() {
        this.loading = true;
        this.errorMessage = "";
        this.rxTestService.getRepos(this.userName)
            .subscribe((response) => { this.repos = response; },
                       (error) => { this.errorMessage = error; this.loading = false; },
                       () => { this.loading = false;})
    }

}
