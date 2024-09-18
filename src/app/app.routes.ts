import {Routes} from "@angular/router";

export const rootRoutes: Routes = [
  {
    path: "auth",
    loadComponent: () => import("./pages/auth/auth-page.component").then(m => m.AuthPageComponent),
  },
  {
    path: "setup",
    loadComponent: () => import("./pages/setup/setup-page.component").then(m => m.SetupPageComponent),
  },
  {
    path: "dirs-picker",
    loadComponent: () =>
      import("./pages/dirs-picker/dirs-picker-page.component").then(m => m.DirsPickerPageComponent),
  },
  {
    path: "settings",
    loadComponent: () => import("./pages/settings/settings-page.component").then(m => m.SettingsPageComponent),
  },
  {
    path: "",
    loadChildren: () => import("./layout/layout.routes")
      .then(m => m.layoutRoutes)
  }
];
