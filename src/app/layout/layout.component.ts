import {Component, inject} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonSearchbar,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  LoadingController
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {bookmarksOutline, folderOutline, homeOutline, imagesOutline} from "ionicons/icons";
import {AuthService} from "../pages/auth/auth.service";
import {clearAuthTokens, getAuthTokens} from "../modules/http/http.constants";
import {finalize} from "rxjs";
import {JwtDto} from "../pages/auth/auth.types";

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
    IonMenu,
    IonHeader,
    IonSearchbar,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
  ]
})
export class LayoutComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly loadingCtrl = inject(LoadingController);

  constructor() {
    addIcons({homeOutline, bookmarksOutline, imagesOutline, folderOutline});
    addIcons({
      "logo": "assets/logo.svg"
    });
  }

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: "Logout...",
    });
    await loading.present();
    this.authService.logout().pipe(
      finalize(() => {
        loading.dismiss();
      })).subscribe(() => {
      clearAuthTokens().then(() => {
        this.router.navigateByUrl("/auth");
      });
    });
  }

}
