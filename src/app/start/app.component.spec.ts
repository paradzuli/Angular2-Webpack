import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () =>
    {
        beforeEach(() => {
            TestBed.configureTestingModule(
                    {
                        imports: [RouterTestingModule],
                        declarations: [AppComponent]
                    }
                        );
                    }
                );

        it("test should work", () => {
            TestBed.compileComponents().then(() => {
                //const fixture = TestBed.createComponent(AppComponent);
                expect(4).toEqual(4);
            });
        });

        it ('should work', () => {
            let fixture = TestBed.createComponent(AppComponent);
            expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
        });
});
