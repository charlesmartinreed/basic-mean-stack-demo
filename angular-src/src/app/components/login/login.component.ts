import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  // component properties
  username: String;
  password: String;

  //inject auth service as dependency
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  // linked via the ngModel directive
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    // returns observable, subscribe
    this.authService.authenticateUser(user).subscribe(data => {
      // data = {success, token, {user}} - we'll store this with localStorage
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("Logged in successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["dashboard"]);
      } else {
        // note that the messages come from our server, served up as { msg: ...}
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["login"]);
      }
    });
  }
}
