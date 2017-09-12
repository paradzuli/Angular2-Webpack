import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;



    constructor(private router: Router) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBEAa8MlzFMt2dc_XT0SP8wZRDtEziY6nk",
            authDomain: "gigabytegames-bdcad.firebaseapp.com",
            databaseURL: "https://gigabytegames-bdcad.firebaseio.com",
            projectId: "gigabytegames-bdcad",
            storageBucket: "gigabytegames-bdcad.appspot.com",
            messagingSenderId: "793396731429"
        };
        firebase.initializeApp(config);

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) {
            return true;
        }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                alert(`${error.message} Please Try Again!`);
            });
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth()
            .signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert(`${error.message} Unable to login. Try again!`);
            });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth()
            .signOut()
            .then(function() {
                    alert('Logged Out!');
                },
                function(error) {
                    alert(`${error.message} Unable to logout. Try again!`);
                });
    }
}