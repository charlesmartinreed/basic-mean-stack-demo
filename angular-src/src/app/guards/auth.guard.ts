// Setup similiarly to a service

import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // if the user is logged in, the page can be accessed. If not, redirect them to login.
  canActivate() {
    if (this.authService.loggedIn()) {
      // meaning the token check returned false, token was NOT expired
      this.router.navigate(["/login"]);
      return false;
    } else {
      return true;
    }
  }
}
