import {Routes} from "@angular/router";

export const layoutRoutes: Routes = [
  {
    path: "home",
    loadComponent: () => import("../pages/home/home-page.component").then(m => m.HomePageComponent),
  },
];
