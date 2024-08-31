import {Component, inject} from "@angular/core";
import {IonApp, IonRouterOutlet, Platform} from "@ionic/angular/standalone";
import {SplashScreen} from "@capacitor/splash-screen";

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

  constructor() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

}
