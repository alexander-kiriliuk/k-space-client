import {StoreMessageMd} from "./store-message-md";

export interface StoreMessage<Data = unknown> {
  key: string;
  metadata: StoreMessageMd;
  payload?: Data;
}
