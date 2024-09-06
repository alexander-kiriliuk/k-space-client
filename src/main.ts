import {bootstrapApplication} from "@angular/platform-browser";
import {
  PreloadAllModules,
  provideRouter,
  RouteReuseStrategy,
  withPreloading
} from "@angular/router";
import {IonicRouteStrategy, provideIonicAngular} from "@ionic/angular/standalone";
import {AppComponent} from "./app/app.component";
import {rootRoutes} from "./app/app.routes";

window.debugMode = localStorage.getItem("debugMode") === "true";
console.debug = function (...args: unknown[]) {
  if (!window.debugMode) return;
  console.log.apply(this, args);
};

bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(rootRoutes, withPreloading(PreloadAllModules)),
  ],
});
