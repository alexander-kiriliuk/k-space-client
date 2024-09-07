import {Injectable} from "@angular/core";
import {HttpReqOptions, ReqMethod} from "./http.types";
import {CapacitorHttp, HttpOptions, HttpResponse} from "@capacitor/core";
import {
  API_PREFIX,
  clearAuthTokens,
  DEFAULT_HEADERS,
  DEFAULT_RESPONSE_TYPE,
  getAuthTokens,
  getHost,
  setAuthTokens
} from "./http.constants";
import {catchError, first, from, mergeMap, Observable, of, switchMap} from "rxjs";
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
            const obs = this.getObservableByMethod(options, method, data);
            return obs.pipe(
              switchMap((response: HttpResponse) => {
                if (response.status >= 200 && response.status < 300) {
                  return of(response.data);
                } else if (response.status === 403 && response.data.message === "ERR_TOKEN_A") {
                  return this.exchangeToken().pipe(
                    switchMap(newTokenPairRes => {
                      return from(setAuthTokens(newTokenPairRes)).pipe(
                        mergeMap(() => {
                          return this.request(method, url, data, opt);
                        })
                      );
                    })
                  );
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

  private exchangeToken(): Observable<JwtDto> {
    return from(getAuthTokens()).pipe(
      mergeMap(tokenRes => {
        const tokenPair = JSON.parse(tokenRes.value) as JwtDto;
        if (!tokenPair?.refreshToken) {
          throw new Error("No one token found");
        }
        clearAuthTokens();
        return this.post<JwtDto>("/auth/exchange-token", {token: tokenPair.refreshToken}).pipe(
          catchError(() => {
            throw new Error("Token exchange failed");
          })
        );
      })
    );
  }

  private getObservableByMethod(options: HttpOptions, method: ReqMethod, data: unknown) {
    switch (method) {
    case "POST":
      options.data = data;
      return from(CapacitorHttp.post(options));
    case "PUT":
      options.data = data;
      return from(CapacitorHttp.put(options));
    case "PATCH":
      options.data = data;
      return from(CapacitorHttp.patch(options));
    case "DELETE":
      return from(CapacitorHttp.delete(options));
    }
    return from(CapacitorHttp.get(options));
  }

}
