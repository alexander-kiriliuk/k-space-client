import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";
import {Router} from "@angular/router";
import {DirsState} from "../../global/state/dirs-state";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: "settings",
  templateUrl: "./settings-page.component.html",
  styleUrl: "./settings-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonContent,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    AsyncPipe,
  ]
})
export class SettingsPageComponent {

  readonly dirsState = inject(DirsState);
  private readonly router = inject(Router);

  constructor() {
    addIcons({arrowBackOutline});
  }

  navBack() {
    this.router.navigateByUrl("/");
  }

}
