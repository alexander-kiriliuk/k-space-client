import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SetupForm} from "./setup.types";

export function createSetupForm(): FormGroup<SetupForm> {
  return new FormGroup<SetupForm>({
    apiHost: new FormControl<string>(undefined, [Validators.required]),
  });
}
