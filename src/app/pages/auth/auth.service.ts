import {inject, Injectable} from "@angular/core";
import {JwtDto, LoginPayload} from "./auth.types";
import {HttpService} from "../../modules/http/http.service";
import {finalize} from "rxjs";
import {clearAuthTokens} from "../../modules/http/http.constants";

@Injectable({providedIn: "root"})
export class AuthService {

  private readonly http = inject(HttpService);

  auth(payload: LoginPayload) {
    return this.http.post<JwtDto>("/auth/login", payload);
  }

  logout() {
    return this.http.post<void>("/auth/logout", {}).pipe(finalize(() => {
      clearAuthTokens();
    }));
  }

}
