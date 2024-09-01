import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: "auth",
    loadComponent: () => import("./auth/auth.component").then(m => m.AuthComponent),
  },
  {
    path: "setup",
    loadComponent: () => import("./setup/setup.component").then(m => m.SetupComponent),
  },
];
