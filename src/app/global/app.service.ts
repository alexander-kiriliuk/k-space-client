import {inject, Injectable} from "@angular/core";
import {HttpService} from "../modules/http/http.service";

@Injectable()
export class AppService {

  private readonly http = inject(HttpService);

  getOptions() {
    return this.http.get<{[k:string]: unknown}>("/app/options");
  }

}
