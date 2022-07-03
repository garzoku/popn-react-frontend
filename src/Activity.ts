import { Badge } from "./Badge";

export class Activity {
  id?: number;
  imageUrl!: string;
  name!: string;
  websiteUrl!: string;
  city!: string;
  state!: string;
  description!: string;
  hourBeginning!: string;
  hourEnding!: string;
  dateBeginning!: string;
  dateEnding!: string;
  isChildFriendly!: boolean;
  isAdmission!: boolean;
  isNoAlcohol!: boolean;
  isPetFriendly!: boolean;
  isParking!: boolean;
  isAccessible!: boolean;
  isWifi!: boolean;
  isRsvp!: boolean;
  badgesDto?: Badge[];
}
