import {HttpOptions} from "@capacitor/core";

export type HttpReqOptions = Omit<HttpOptions, "url" | "method" | "data">;

export type ReqMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
