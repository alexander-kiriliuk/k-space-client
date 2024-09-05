import {inject, Injectable} from "@angular/core";
import {JwtDto, LoginPayload} from "./auth.types";
import {HttpService} from "../../modules/http/http.service";

@Injectable()
export class AuthService {

  private readonly http = inject(HttpService);

  auth(payload: LoginPayload) {
    return this.http.post<JwtDto>("/auth/login", payload);
  }

}
