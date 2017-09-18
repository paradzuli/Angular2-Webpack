import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from '../admin/adminShared/user.service';
import { ShopComponent } from './shop.component';
import { NavComponent } from '../shared/navbar.component';
import { TruncatePipe } from '../admin/adminShared/trunc.pipe';

describe('Shop Component', () => {
    let comp: ShopComponent;
    let fixture: ComponentFixture<ShopComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        let userServiceStub = {

        };

        TestBed.configureTestingModule(
            {
                imports: [RouterTestingModule],
                declarations: [ShopComponent, NavComponent, TruncatePipe],
                providers: [{ provide: UserService, useValue: userServiceStub }]
            }).compileComponents();

        //UserService from the root injector
        let userService = TestBed.get(UserService);

    });

    it('should work', () => {
        let fixture = TestBed.createComponent(ShopComponent);
        let comp = fixture.componentInstance;
        expect(comp instanceof ShopComponent).toBe(true, 'should create ShopComponent');
    });


});
