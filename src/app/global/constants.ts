export class Roles {
  static readonly ROOT = "root";
  static readonly ADMIN = "admin";
  static readonly MANAGER = "manager";
}

export enum CurrentUserStateEvent {
  Set = "current:user:set",
  Update = "current:user:update",
}


export enum DirsStateEvent {
  Set = "dirs:state:set"
}
