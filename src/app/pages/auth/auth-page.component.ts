import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {
  AlertController,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
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
import {catchError, finalize} from "rxjs";
import {setAuthTokens} from "../../modules/http/http.constants";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
  selector: "auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrl: "./auth-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ]
})
export class AuthPageComponent {

  readonly form = createLoginForm();
  private readonly loadingCtrl = inject(LoadingController);
  private readonly alertController = inject(AlertController);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async doLogin() {
    const loading = await this.loadingCtrl.create({
      message: "Authorization...",
    });
    await loading.present();
    this.authService.auth(this.form.getRawValue()).pipe(
      catchError(async error => {
        const alert = await this.alertController.create({
          header: "Error",
          subHeader: error.message,
          buttons: ["OK"],
        });
        await alert.present();
        throw new Error(error);
      }),
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(async result => {
      await setAuthTokens(result);
      this.router.navigateByUrl("/home");
    });
  }

}
