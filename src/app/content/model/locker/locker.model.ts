export interface LockerModel {
  id: number;
  lockerId: string;
  lockerState: string;
  locationId: number;
}

export interface CreateLockerDto {
  lockerId: string;
  lockerState: string;
  locationId: number;
}
