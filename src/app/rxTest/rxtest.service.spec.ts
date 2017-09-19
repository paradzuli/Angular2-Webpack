import { RxTestService } from './rx-test.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { repos } from './repos';

const mockResponse = {
    data: [
        { id: '1', name: 'Repo 1', html_url: 'Html Url Repo 1', description: 'This is the description for Repo 1' },
        { id: '2', name: 'Repo 2', html_url: 'Html Url Repo 2', description: 'This is the description for Repo 2' }
    ]
};

describe('RX Test Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [RxTestService,
                { provide: XHRBackend, useClass: MockBackend }]
        });
    });

    it('should return an Observable<repos>', () => {
        inject([RxTestService, XHRBackend], (rxTestService: RxTestService, mockBackend: MockBackend) => {

            mockBackend.connections.subscribe((connection: MockConnection) => {
                connection.mockRespond(
                    new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));

                rxTestService.getRepos('test').subscribe((repoList) => {
                    expect(repoList.length).toBe(2);
                    expect(repoList[0].id).toContain('1');
                    expect(repoList[1].id).toContain('2');
                });

            });
        });
    });
})
