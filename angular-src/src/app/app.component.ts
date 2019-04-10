import { Component } from "@angular/core";

// decorator allows us to add the selector, which is used to select the component in html
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Mean Stack, Front to Back";
}
