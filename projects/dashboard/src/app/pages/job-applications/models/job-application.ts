import { statKey } from "./application-stat-key";

export interface JobApplication {
  id: string;
  fullName: string;
  industry: string;
  email: string;
  englishLevel: string;
  phone: string;
  currentJobTitle: string;
  yearsOfExperience: number;
  nationality: string;
  submissionCode: string;
  submissionDate: string;
  status: statKey
}
