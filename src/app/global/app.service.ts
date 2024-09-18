import {inject, Injectable} from "@angular/core";
import {HttpService} from "../modules/http/http.service";
import {Category, Language} from "./types";

@Injectable({providedIn: "root"})
export class AppService {

  private readonly http = inject(HttpService);

  getOptions() {
    return this.http.get<{ langs: Language[] }>("/app/options");
  }

  checkAccess() {
    return this.http.get<{ [k: string]: unknown }>("/app/check-access");
  }

  getDirsTree() {
    return this.http.get<Category>("/app/dirs-tree");
  }

}
