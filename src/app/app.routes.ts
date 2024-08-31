import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./auth/auth.component").then(m => m.AuthComponent),
  },
];
