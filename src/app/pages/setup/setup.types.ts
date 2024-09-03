import {FormControl} from "@angular/forms";

export interface SetupPayload {
  apiHost: string;
}

export type SetupForm = {
  [K in keyof SetupPayload]: FormControl<SetupPayload[K]>;
}
