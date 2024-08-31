import {Component} from "@angular/core";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: "auth",
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class AuthComponent {

  constructor() {
  }

}
