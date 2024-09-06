import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {
  IonContent,
  IonFooter,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {bookmarksOutline, folderOutline, homeOutline, imagesOutline} from "ionicons/icons";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
  standalone: true,
  imports: [
    RouterOutlet,
    IonContent,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonTabBar,
    IonTabButton,
    IonIcon
  ]
})
export class LayoutComponent {

  constructor() {
    addIcons({homeOutline, bookmarksOutline, imagesOutline, folderOutline});
  }

}
