import { Activity } from "./Activity";

export class Badge {
  id!: number;
  name!: string;
  plainActivityDto?: Activity[];

  setBadgeId(id: number) {
    this.id = id;
  }
}
