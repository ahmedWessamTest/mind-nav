import { statKey } from "./application-stat-key";

export interface ApplicationStatOptions {
  key: statKey;
  label: string;
  active: boolean;
}
