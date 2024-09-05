import {Injectable} from "@angular/core";
import {HttpReqOptions, ReqMethod} from "./http.types";
import {CapacitorHttp, HttpOptions, HttpResponse} from "@capacitor/core";
import {
  API_PREFIX,
  DEFAULT_HEADERS,
  DEFAULT_RESPONSE_TYPE,
  getAuthTokens,
  getHost
} from "./http.constants";
import {first, from, map, mergeMap, Observable} from "rxjs";
import {JwtDto} from "../../pages/auth/auth.types";

@Injectable({providedIn: "root"})
export class HttpService {

  get<T>(url: string, opt?: HttpReqOptions): Observable<T> {
    return this.request("GET", url, undefined, opt);
  }

  post<T>(url: string, data: unknown, opt?: HttpReqOptions): Observable<T> {
    return this.request("POST", url, data, opt);
  }

  put<T>(url: string, data: unknown, opt?: HttpReqOptions): Observable<T> {
    return this.request("PUT", url, data, opt);
  }

  patch<T>(url: string, data: unknown, opt?: HttpReqOptions): Observable<T> {
    return this.request("PATCH", url, data, opt);
  }

  delete<T>(url: string, opt?: HttpReqOptions): Observable<T> {
    return this.request("DELETE", url, undefined, opt);
  }

  private request<T>(method: ReqMethod, url: string, data?: unknown, opt?: HttpReqOptions): Observable<T> {
    return from(getHost()).pipe(
      mergeMap(host => {
        return from(getAuthTokens()).pipe(
          mergeMap(tokenRes => {
            const options: HttpOptions = {
              url: `${host.value}${API_PREFIX}${url}`,
              headers: DEFAULT_HEADERS,
              responseType: DEFAULT_RESPONSE_TYPE,
            };
            if (tokenRes) {
              const tokenPair = JSON.parse(tokenRes.value) as JwtDto;
              if (tokenPair && Object.keys(tokenPair).length) {
                options.headers["authorization"] = `Bearer ${tokenPair.accessToken}`;
              }
            }
            Object.assign(options, opt);
            let obs: Observable<HttpResponse>;
            switch (method) {
            case "POST":
              options.data = data;
              obs = from(CapacitorHttp.post(options));
              break;
            case "PUT":
              options.data = data;
              obs = from(CapacitorHttp.put(options));
              break;
            case "PATCH":
              options.data = data;
              obs = from(CapacitorHttp.patch(options));
              break;
            case "DELETE":
              obs = from(CapacitorHttp.delete(options));
              break;
            default:
              obs = from(CapacitorHttp.get(options));
              break;
            }
            return obs.pipe(
              map((response: HttpResponse) => {
                if (response.status >= 200 && response.status < 300) {
                  return response.data;
                } else {
                  throw new Error(`HTTP Error: ${response.status}`);
                }
              })
            );
          })
        );
      }),
      first()
    ) as Observable<T>;
  }
}

