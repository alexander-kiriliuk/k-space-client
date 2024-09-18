import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
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
  LoadingController,
  Platform
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
import {CurrentUserStateEvent, DirsStateEvent} from "../global/constants";
import {CurrentUserState} from "../global/state/current-user.state";
import {AsyncPipe} from "@angular/common";
import {PictureDirective} from "../modules/media/picture.directive";
import {getDirsForSync} from "../pages/dirs-picker/dirs-picker.constants";
import {AppService} from "../global/app.service";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    RouterLink,
  ]
})
export class LayoutComponent implements OnInit {

  readonly currentUser = inject(CurrentUserState);
  private readonly authService = inject(AuthService);
  private readonly loadingCtrl = inject(LoadingController);
  private readonly profileService = inject(ProfileService);
  private readonly appService = inject(AppService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly platform = inject(Platform);

  constructor() {
    addIcons({homeOutline, bookmarksOutline, imagesOutline, folderOutline, settingsOutline, logOutOutline});
    addIcons({
      "logo": "assets/logo.svg"
    });
  }

  async ngOnInit() {
    this.profileService.getUser().subscribe(user => {
      this.store.emit(CurrentUserStateEvent.Set, user);
    });
    if (this.platform.is("desktop") || this.platform.is("mobileweb")) {
      this.appService.getDirsTree().subscribe(dirs => {
        this.store.emit(DirsStateEvent.Set, dirs);
        if (!dirs?.children) {
          this.router.navigateByUrl("/settings");
        }
      });
    } else {
      const dirs = await getDirsForSync();
      if (!dirs) {
        this.router.navigateByUrl("/dirs-picker");
      }
    }
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
