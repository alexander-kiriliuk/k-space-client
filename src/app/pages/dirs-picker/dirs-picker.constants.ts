import {Preferences} from "@capacitor/preferences";

export const DIRS_FOR_SYNC_TOKEN = "dirsForSync";

export async function getDirsForSync(): Promise<string[]> {
  const res = await Preferences.get({key: DIRS_FOR_SYNC_TOKEN});
  if (!res.value) {
    return undefined;
  }
  return JSON.parse(res.value);
}
