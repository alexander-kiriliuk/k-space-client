export class Roles {
  static readonly ROOT = "root";
  static readonly ADMIN = "admin";
  static readonly MANAGER = "manager";
}

export enum CurrentUserEvent {
  Set = "current:user:set",
  Update = "current:user:update",
}
