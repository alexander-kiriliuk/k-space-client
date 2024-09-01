/*
 * Copyright 2023 Alexander Kiriliuk
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 * limitations under the License.
 */

declare global {
  interface Window {
    debugMode: boolean;
  }
}

export type SystemTheme = "light" | "dark";

export interface Media {
  id: number;
  code: string;
  name: LocalizedString[];
  type: MediaType;
  files: MediaFile[];
}

export interface MediaType {
  code: string;
  name: string;
  vp6: boolean;
  private: boolean;
  quality: number;
  ext: MediaExt;
  formats: MediaFormat[];
}

export interface MediaFormat {
  code: string;
  name: string;
  width: string;
  height: string;
}

export interface MediaFile {
  id: number;
  code: string;
  name: string;
  width: number;
  height: number;
  size: number;
  format: MediaFormat;
  media: Media;
}

export interface MediaExt {
  code: string;
  name: string;
}


export interface Language {
  id: string;
  code: string;
  name: string;
  icon: Media;
}

export interface LocalizedString {
  id: number;
  code: string;
  lang: Language;
  value: string;
}

export interface LocalizedMedia {
  id: number;
  code: string;
  lang: Language;
  value: Media;
}

export interface Category<Params = unknown> {
  id: number;
  code: string;
  url: string;
  name: LocalizedString[];
  params: Params;
  icon: Media;
  parent: Category<Params>;
  children: Category<Params>[];
}

export interface User {
  id: string;
  avatar: Media;
  password: string;
  login: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  active: boolean;
  roles: UserRole[];
  tsCreated?: Date;
}

export interface UserRole {
  code: string;
  name: LocalizedString[];
  tsCreated: Date;
}

export interface PageableParams {
  limit?: number;
  page?: number;
  sort?: string;
  order?: SortOrder;
  filter?: string;
}

export interface PageableData<T = unknown> {
  items: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}


export type SortOrder = "ASC" | "DESC";

export type CaptchaResponse = {
  id?: string;
  type?: string;
  image?: string;
  enabled?: boolean;
}
