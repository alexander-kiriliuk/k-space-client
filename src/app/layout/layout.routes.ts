import {Routes} from "@angular/router";

export const layoutRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import("./layout.component").then(m => m.LayoutComponent),
    children: [
      {
        path: "home",
        loadComponent: () => import("../pages/home/home-page.component").then(m => m.HomePageComponent)
      }
    ]
  },
];
