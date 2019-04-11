import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  // class properties
  user: Object;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // load the user, when the component initializes
    this.authService.getProfile().subscribe(
      profile => {
        this.user = profile.user;
      },
      // observables throw errs
      err => {
        console.log(err);
        return false;
      }
    );
  }
}
