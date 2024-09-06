import {Component, inject, OnInit} from "@angular/core";
import {
  AlertController,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonRow
} from "@ionic/angular/standalone";
import {createSetupForm} from "./setup.constants";
import {ReactiveFormsModule} from "@angular/forms";
import {Preferences} from "@capacitor/preferences";
import {Router} from "@angular/router";
import {SetupService} from "./setup.service";
import {API_HOST_TOKEN} from "../../modules/http/http.constants";

@Component({
  selector: "setup-page",
  templateUrl: "./setup-page.component.html",
  styleUrls: ["./setup-page.component.scss"],
  standalone: true,
  providers: [SetupService],
  imports: [
    IonCol,
    IonContent,
    IonGrid,
    IonInput,
    IonRow,
    IonButton,
    ReactiveFormsModule,
  ]
})
export class SetupPageComponent implements OnInit {

  readonly form = createSetupForm();
  private readonly alertController = inject(AlertController);
  private readonly setupService = inject(SetupService);
  private readonly router = inject(Router);

  ngOnInit() {
    Preferences.get({key: API_HOST_TOKEN}).then(res => {
      if (res.value) {
        this.form.patchValue({apiHost: res.value});
      }
    });
  }

  async applySettings() {
    const host = this.form.controls.apiHost.value;
    await this.setupService.checkHost(host).then(async () => {
      const alert = await this.alertController.create({
        header: "Connected successful",
        message: "Now you can login to system",
        buttons: ["OK"],
      });
      await alert.present();
      alert.onDidDismiss().then(() => {
        Preferences.set({key: API_HOST_TOKEN, value: host}).then(() => {
          this.router.navigateByUrl("/auth");
        });
      });
    }).catch(async () => {
      const alert = await this.alertController.create({
        header: "Cant connect to server",
        message: "Please try again",
        buttons: ["OK"],
      });
      await alert.present();
    });
  }

}
