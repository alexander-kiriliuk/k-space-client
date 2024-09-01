import {Component, inject} from "@angular/core";
import {IonApp, IonRouterOutlet, Platform} from "@ionic/angular/standalone";
import {SplashScreen} from "@capacitor/splash-screen";
import {Preferences} from "@capacitor/preferences";
import {Router} from "@angular/router";
import {App} from "@capacitor/app";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
  ],
})
export class AppComponent {

  private readonly platform = inject(Platform);
  private readonly router = inject(Router);
  private readonly routerOutlet = inject(IonRouterOutlet, {optional: true});

  constructor() {
    this.platform.ready().then(() => {
      this.checkApi();
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet?.canGoBack()) {
        App.exitApp();
      }
    });
  }

  private checkApi() {
    Preferences.get({key: "apiHost"}).then(res => {
      if (!res.value) {
        this.router.navigateByUrl("/setup");
      } else {
        this.router.navigateByUrl("/auth");
        // todo check authorize
      }
      SplashScreen.hide();
    });
  }

}
