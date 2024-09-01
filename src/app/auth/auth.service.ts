import {Injectable} from "@angular/core";
import {LoginPayload} from "./auth.types";
import {CapacitorHttp} from "@capacitor/core";
import {API_PREFIX} from "../../global/constants";
import {GetResult, Preferences} from "@capacitor/preferences";

@Injectable()
export class AuthService {

  async auth(payload: LoginPayload) {
    const host: GetResult = await Preferences.get({key: "apiHost"});
    return CapacitorHttp.post({
      url: `${host.value}${API_PREFIX}/auth/login`,
      data: payload,
      headers: {
        "content-type":"application/json"
      },
      responseType: "json"
    });
  }

}
