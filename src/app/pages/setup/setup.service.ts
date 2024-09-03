import {Injectable} from "@angular/core";
import {CapacitorHttp} from "@capacitor/core";
import {API_PREFIX} from "../../global/constants";

@Injectable()
export class SetupService {

  checkHost(host: string) {
    return CapacitorHttp.get({
      url: `${host}${API_PREFIX}/app/ping`,
      headers: {
        "content-type":"application/json"
      },
      responseType: "json"
    });
  }

}
