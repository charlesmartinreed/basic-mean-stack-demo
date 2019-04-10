import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // service properties
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user) {
    // make a post request to register
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    // return an observable - we subscribe to this with rxjs
    return this.http
      .post("http://localhost:3000/users/register", user, httpOptions)
      .pipe(map((res: any) => res));
  }
}
