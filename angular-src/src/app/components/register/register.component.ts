import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  // user properties
  name: String;
  username: String;
  email: String;
  password: String;

  // inject service
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    // keyword 'this' works because the properties are bound to the input with the ngModel directive

    // make an object
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      // some fields were missing
      this.flashMessage.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 2000
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      // some fields were missing
      this.flashMessage.show("Please use a valid email address", {
        cssClass: "alert-danger",
        timeout: 2000
      });
      return false;
    }
    console.log("submission complete");
  }
}
