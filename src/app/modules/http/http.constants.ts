import {Preferences} from "@capacitor/preferences";
import {JwtDto} from "../../pages/auth/auth.types";

export const API_PREFIX = "/api/v1";
export const API_HOST_TOKEN = "apiHost";
export const AUTH_TOKEN_PAIR_TOKEN = "tokenPair";
export const DEFAULT_HEADERS = {
  "content-type": "application/json"
};
export const DEFAULT_RESPONSE_TYPE = "json";


export function getHost() {
  return Preferences.get({key: API_HOST_TOKEN});
}

export function setAuthTokens(data: JwtDto) {
  const {accessToken, refreshToken} = data;
  return Preferences.set({key: AUTH_TOKEN_PAIR_TOKEN, value: JSON.stringify({accessToken, refreshToken})});
}

export function getAuthTokens() {
  return Preferences.get({key: AUTH_TOKEN_PAIR_TOKEN});
}
