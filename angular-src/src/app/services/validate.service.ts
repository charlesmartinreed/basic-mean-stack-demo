import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidateService {
  constructor() {}

  // gets user object from register component
  validateRegister(user) {
    if (
      user.name === undefined ||
      user.email === undefined ||
      user.username === undefined ||
      user.password === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    // regex pulled from stack overflow
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
