import {Component, inject, OnInit} from "@angular/core";
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
  IonRow,
  IonSearchbar,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  LoadingController
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {
  bookmarksOutline,
  folderOutline,
  homeOutline,
  imagesOutline,
  logOutOutline,
  settingsOutline
} from "ionicons/icons";
import {AuthService} from "../pages/auth/auth.service";
import {clearAuthTokens} from "../modules/http/http.constants";
import {finalize} from "rxjs";
import {ProfileService} from "../pages/profile/profile.service";
import {Store} from "../global/store/store";
import {CurrentUserEvent} from "../global/constants";
import {CurrentUser} from "../global/user/current-user";
import {AsyncPipe} from "@angular/common";
import {PictureDirective} from "../modules/media/picture.directive";

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
    AsyncPipe,
    PictureDirective,
    IonRow,
  ]
})
export class LayoutComponent implements OnInit {

  readonly currentUser = inject(CurrentUser);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly profileService = inject(ProfileService);
  private readonly store = inject(Store);

  constructor() {
    addIcons({homeOutline, bookmarksOutline, imagesOutline, folderOutline, settingsOutline, logOutOutline});
    addIcons({
      "logo": "assets/logo.svg"
    });
  }

  ngOnInit() {
    this.profileService.getUser().subscribe(user => {
      this.store.emit(CurrentUserEvent.Set, user);
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
