export enum Role {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  RIDER = "RIDER",
}

export type RoleType = (typeof Role)[keyof typeof Role];
