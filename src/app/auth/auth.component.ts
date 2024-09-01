import {Component, inject} from "@angular/core";
import {
  AlertController,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonRow,
  LoadingController
} from "@ionic/angular/standalone";
import {ReactiveFormsModule} from "@angular/forms";
import {createLoginForm} from "./auth.constants";
import {AuthService} from "./auth.service";

@Component({
  selector: "auth",
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
  standalone: true,
  providers: [AuthService],
  imports: [
    IonInput,
    IonItem,
    IonContent,
    IonInputPasswordToggle,
    IonCol,
    IonRow,
    IonGrid,
    ReactiveFormsModule,
    IonButton,
  ]
})
export class AuthComponent {

  readonly form = createLoginForm();
  private readonly loadingCtrl = inject(LoadingController);
  private readonly authService = inject(AuthService);
  private readonly alertController = inject(AlertController);

  async doLogin() {
    const loading = await this.loadingCtrl.create({
      message: "Authorization...",
    });
    await loading.present();
    this.authService.auth(this.form.getRawValue()).then(async result => {
      const alert = await this.alertController.create({
        header: "Login successful",
        message: JSON.stringify(result.data),
        buttons: ["OK"],
      });
      await alert.present();
    }).catch(async error => {
      console.log(error);
      const alert = await this.alertController.create({
        header: "Error was occurred",
        buttons: ["OK"],
      });
      await alert.present();
    }).finally(() => {
      loading.dismiss();
    });
  }

}
