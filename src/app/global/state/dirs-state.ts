import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Category} from "../types";
import {Store} from "../store/store";
import {DirsStateEvent} from "../constants";

@Injectable({providedIn: "root"})
export class DirsState {

  private readonly sub = new BehaviorSubject<Category>(null);
  private readonly store = inject(Store);
  readonly asObservable = this.sub.asObservable();

  constructor() {
    this.store.on<Category>(DirsStateEvent.Set)
      .subscribe(v => this.setState(v.payload));
  }

  get data() {
    return this.sub.value;
  }

  private setState(three: Category) {
    this.sub.next(three);
  }

}
