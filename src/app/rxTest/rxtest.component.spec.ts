import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';


import { Observable } from 'rxjs/Rx';
import { RxTestComponent } from './rxtest.component';
import { RxTestService } from './rx-test.service';
import { repos } from './repos';

class MockRxTestService extends RxTestService {

    constructor() {
        super(null);
    }

    testRepos: Array<repos> = [ ];
    

    public getRepos(userName: string): Observable<repos[]> {
        let repo = new repos();
        repo.id = "1";
        repo.name = "Repo 1";
        repo.html_url = "Url for Repo 1";
        repo.description = "This is description for Repo1";
        this.testRepos.push(repo);
        return Observable.of(this.testRepos);
    }
}

describe('RX Test Component', () => {
    let rxComponent: RxTestComponent;
    let fixture: ComponentFixture<RxTestComponent>;
    let de: DebugElement;
    let el: HTMLElement;


    beforeEach(() => {
        let rxTestService = new MockRxTestService();

        TestBed.configureTestingModule({
            imports: [RouterTestingModule,FormsModule],
            declarations: [RxTestComponent],
            providers: [{ provide: RxTestService, useValue: rxTestService }]
        }).compileComponents();
    });



    it('should work', () => {
        let fixture = TestBed.createComponent(RxTestComponent);
        let comp = fixture.componentInstance;
        expect(comp instanceof RxTestComponent).toBe(true, 'should create RxTestComponent');
    });

    it('should click', () => {
        let fixture = TestBed.createComponent(RxTestComponent);
        let comp = fixture.componentInstance;
        spyOn(comp, 'getRepos');

        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();

        fixture.whenStable().then(() => {
            expect(comp.getRepos).toHaveBeenCalled();
        })
    });


    it('should get repos', () => {
        let fixture = TestBed.createComponent(RxTestComponent);
        let comp = fixture.componentInstance;
        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        expect(comp.repos.length).toBe(1);
    });

    it('number of rows should match items plus 1 after button click', () => {
        let fixture = TestBed.createComponent(RxTestComponent);
        let comp = fixture.componentInstance;
        
        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();

        fixture.detectChanges();

        let trsAfterClick = fixture.debugElement.nativeElement.querySelectorAll('tr');
        expect(trsAfterClick.length).toBe(2);
    });

    it('check for the data binding after button click', () => {
        let fixture = TestBed.createComponent(RxTestComponent);
        let comp = fixture.componentInstance;

        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();

        fixture.detectChanges();

        let trsAfterClick = fixture.debugElement.nativeElement.querySelectorAll('tr');
        expect(trsAfterClick.length).toBe(2);

        let tdIdContent = trsAfterClick[1].cells[0].textContent;
        expect(tdIdContent).toContain('1');

        let tdNameContent = trsAfterClick[1].cells[1].textContent;
        expect(tdNameContent).toContain('Repo 1');

        let tdHtmlUrlContent = trsAfterClick[1].cells[2].textContent;
        expect(tdHtmlUrlContent).toContain('Repo 1');

        let tdDescriptionContent = trsAfterClick[1].cells[3].textContent;
        expect(tdDescriptionContent).toContain('Repo1');

    });

});