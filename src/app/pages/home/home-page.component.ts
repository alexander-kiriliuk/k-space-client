import {Component} from "@angular/core";
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
  standalone: true,
  imports: [
    IonContent
  ]
})
export class HomePageComponent {

}
