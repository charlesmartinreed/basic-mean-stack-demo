import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // service properties
  authToken: any;
  user: any;

  //public jwtHelper: JwtHelperService
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  registerUser(user) {
    // make a post request to register
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    // return an observable - we subscribe to this with rxjs
    return this.http
      .post("users/register", user, httpOptions)
      .pipe(map((res: any) => res));
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    // if successful, returns token to store and user info
    return this.http
      .post("users/authenticate", user, httpOptions)
      .pipe(map((res: any) => res));
  }

  getProfile() {
    // using our loadToken method to fetch token from localStorage
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.authToken
      })
    };
    return this.http
      .get("users/profile", httpOptions)
      .pipe(map((res: any) => res));
  }

  storeUserData(token, user) {
    // id_token is what JWT looks for when we auth with passport
    localStorage.setItem("id_token", token);
    // localStorage can only store a string, so we need to convert
    localStorage.setItem("user", JSON.stringify(user));

    // set our property values
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  // Uses angular2-jwt to determine whether or not the user is loggedIn
  loggedIn() {
    // if you don't pass the token, jwt assumes the default one, which has a name of 'token' whereas we set the token to id_token in local storage...
    return this.jwtHelper.isTokenExpired(this.authToken);
  }

  logout() {
    // set our properties to null, clear out localStorage
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
